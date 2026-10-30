import type { Request } from 'express';
import { type IPaymentRepository } from '../../domain/repositories/ipayment.repository.js';
import type { IPaymentService } from '../../domain/services/ipayment.service.js';
import type { PaymentRequestEntity } from '../../domain/entities/payments/payment.entity.js';
export declare class PaymentService implements IPaymentService<PaymentRequestEntity> {
    private readonly repo;
    constructor(repo: IPaymentRepository);
    private getClientIp;
    private normalizeOrderInfo;
    private encodeOrderInfo;
    private formatDate;
    private buildVnpayQuery;
    private createVnpaySecureHash;
    private verifyVnpayQuery;
    createVNPayPayment(payload: PaymentRequestEntity, req: Request): Promise<string>;
    handleVNPayReturn(query: Record<string, unknown>): Promise<{
        redirectUrl: string;
    } | null>;
    createMoMoPayment(payload: PaymentRequestEntity, req: Request): Promise<string>;
    private estimateCartTotal;
}
