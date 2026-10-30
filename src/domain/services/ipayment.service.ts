import type { PaymentRequestEntity } from '../entities/payments/payment.entity.js';

export interface IPaymentService<
  TRequest extends PaymentRequestEntity = PaymentRequestEntity,
> {
  createVNPayPayment(payload: TRequest, req: unknown): Promise<string>;
  handleVNPayReturn(
    query: Record<string, unknown>,
  ): Promise<{ redirectUrl: string } | null>;
  createMoMoPayment(payload: TRequest, req: unknown): Promise<string>;
}
