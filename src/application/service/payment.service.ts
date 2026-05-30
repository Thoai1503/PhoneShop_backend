import { Inject, Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import type { Request } from 'express';
import { PaymentRepository } from '../../infrastruture/repository/payment.repository.js';
import { PaymentRequestDTO } from '../../api/dto/payment.dto.js';

type PaymentInfo = {
  user_id?: number;
  address_id?: number;
  [key: string]: unknown;
};

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PaymentRepository) private readonly repo: PaymentRepository,
  ) {}

  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string) ||
      (req.connection as any).remoteAddress ||
      (req.socket as any).remoteAddress ||
      (req.connection as any).socket?.remoteAddress ||
      '127.0.0.1'
    );
  }

  private normalizeOrderInfo(orderInfo?: string): PaymentInfo {
    if (!orderInfo) return {};

    try {
      return JSON.parse(orderInfo) as PaymentInfo;
    } catch {
      try {
        const decoded = decodeURIComponent(orderInfo);
        return JSON.parse(
          Buffer.from(decoded, 'base64').toString('utf8'),
        ) as PaymentInfo;
      } catch {
        return {};
      }
    }
  }

  private encodeOrderInfo(payload: PaymentInfo): string {
    const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
    return encodeURIComponent(base64);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  private buildVnpayQuery(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params).sort();
    return sortedKeys
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
      )
      .join('&');
  }

  private createVnpaySecureHash(params: Record<string, string>): string {
    const secret = process.env.vnp_HashSecret || '';
    const query = this.buildVnpayQuery(params);
    return createHmac('sha512', secret).update(query).digest('hex');
  }

  private verifyVnpayQuery(query: Record<string, unknown>): boolean {
    const secureHash = String(query.vnp_SecureHash || '').toLowerCase();
    if (!secureHash) {
      return false;
    }

    const params: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (key === 'vnp_SecureHash' || key === 'vnp_SecureHashType') {
        return;
      }

      if (typeof value === 'string' && key.startsWith('vnp_')) {
        params[key] = value;
      }
    });

    const expectedHash = this.createVnpaySecureHash(params).toLowerCase();
    return expectedHash === secureHash;
  }

  async createVNPayPayment(
    payload: PaymentRequestDTO,
    req: Request,
  ): Promise<string> {
    const userId = payload.user_id;
    const amount = Number(payload.amount || 0);
    const orderInfoPayload = this.normalizeOrderInfo(payload.orderInfo);
    const addressId =
      payload.address_id ??
      (Number(orderInfoPayload.address_id ?? 0) || undefined);
    const resolvedAmount = amount > 0 ? amount : 0;

    const finalAmount =
      resolvedAmount > 0
        ? resolvedAmount
        : await this.estimateCartTotal(userId);
    const { orderId } = await this.repo.createOrderFromCart({
      userId,
      amount: finalAmount,
      addressId,
    });

    const encodedOrderInfo = this.encodeOrderInfo({
      ...orderInfoPayload,
      user_id: userId,
      address_id: addressId,
    });

    const vnpParams: Record<string, string> = {
      vnp_Amount: String(finalAmount * 100),
      vnp_BankCode: payload.bankCode || '',
      vnp_Command: 'pay',
      vnp_CreateDate: this.formatDate(new Date()),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: this.getClientIp(req),
      vnp_Locale: payload.language || 'vn',
      vnp_OrderInfo: encodedOrderInfo,
      vnp_OrderType: payload.orderType || 'other',
      vnp_ReturnUrl: process.env.vnp_ReturnUrl || '',
      vnp_TmnCode: process.env.vnp_TmnCode || '',
      vnp_TxnRef: String(orderId),
      vnp_Version: '2.1.0',
    };

    Object.keys(vnpParams).forEach((key) => {
      if (!vnpParams[key]) delete vnpParams[key];
    });

    const secureHash = this.createVnpaySecureHash(vnpParams);
    const query = this.buildVnpayQuery(vnpParams);
    const vnpUrl = process.env.vnp_Url || '';

    return `${vnpUrl}?${query}&vnp_SecureHash=${secureHash}`;
  }

  async handleVNPayReturn(
    query: Record<string, unknown>,
  ): Promise<{ redirectUrl: string } | null> {
    if (!this.verifyVnpayQuery(query)) {
      return null;
    }

    const responseCode = String(query.vnp_ResponseCode || '');
    const orderInfo = this.normalizeOrderInfo(
      String(query.vnp_OrderInfo || ''),
    );
    const userId = Number(orderInfo.user_id || 0);

    if (!userId) return null;

    const pendingOrder = await this.repo.getPendingOrderByUserId(userId);
    if (!pendingOrder) return null;

    if (responseCode === '00') {
      await this.repo.updateOrderStatus(pendingOrder.id, 2);
      await this.repo.deleteCartByUserId(userId);
      return {
        redirectUrl: `https://electric-commercial.vercel.app/successful?id=${query.vnp_TxnRef || ''}&amount=${query.vnp_Amount || ''}`,
      };
    }

    await this.repo.updateOrderStatus(pendingOrder.id, 3);
    await this.repo.deleteCartByUserId(userId);
    return {
      redirectUrl: 'https://electric-commercial.vercel.app/failed',
    };
  }

  async createMoMoPayment(
    payload: PaymentRequestDTO,
    req: Request,
  ): Promise<string> {
    const userId = payload.user_id;
    const amount = Number(payload.amount || 0);
    const orderInfoPayload = this.normalizeOrderInfo(payload.orderInfo);
    const addressId =
      payload.address_id ??
      (Number(orderInfoPayload.address_id ?? 0) || undefined);
    const finalAmount =
      amount > 0 ? amount : await this.estimateCartTotal(userId);

    const { orderId } = await this.repo.createOrderFromCart({
      userId,
      amount: finalAmount,
      addressId,
    });

    const endpoint =
      process.env.momo_Endpoint ||
      'https://payment.momo.vn/v2/gateway/api/create';
    const requestId = payload.orderId || `${Date.now()}`;
    const orderInfo = payload.orderInfo || String(orderId);
    const partnerCode = process.env.momo_PartnerCode || '';
    const accessKey = process.env.momo_AccessKey || '';
    const secretKey = process.env.momo_SecretKey || '';
    const redirectUrl = process.env.momo_RedirectUrl || '';
    const ipnUrl = process.env.momo_IpnUrl || '';
    const requestType = payload.requestType || 'captureWallet';
    const lang = payload.lang || 'vi';
    const extraData = payload.extraData || '';
    const rawSignature = [
      `accessKey=${accessKey}`,
      `amount=${finalAmount}`,
      `extraData=${extraData}`,
      `ipnUrl=${ipnUrl}`,
      `orderId=${requestId}`,
      `orderInfo=${orderInfo}`,
      `partnerCode=${partnerCode}`,
      `redirectUrl=${redirectUrl}`,
      `requestId=${requestId}`,
      `requestType=${requestType}`,
    ].join('&');
    const signature = createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const body = {
      accessKey,
      amount: String(finalAmount),
      extraData,
      ipnUrl,
      orderId: requestId,
      orderInfo,
      partnerCode,
      redirectUrl,
      requestId,
      requestType,
      lang,
      signature,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `MoMo payment request failed with status ${response.status}`,
      );
    }

    const result = (await response.json()) as { payUrl?: string };
    if (!result.payUrl) {
      throw new Error('MoMo payment URL not returned');
    }

    return result.payUrl;
  }

  private async estimateCartTotal(userId: number): Promise<number> {
    const cartItems = await this.repo.getCartItemsByUserId(userId);
    return cartItems.reduce((sum, item) => {
      const unitPrice = Number(item.unit_price || 0);
      return sum + unitPrice * Number(item.quantity || 0);
    }, 0);
  }
}
