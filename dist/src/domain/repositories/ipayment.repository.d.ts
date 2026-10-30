import type { CreateOrderFromCartEntity, CreatedOrderEntity, PaymentCartItemEntity, PendingOrderEntity } from '../entities/payments/payment.entity.js';
export interface IPaymentRepository {
    getCartItemsByUserId(userId: number): Promise<PaymentCartItemEntity[]>;
    createOrderFromCart(payload: CreateOrderFromCartEntity): Promise<CreatedOrderEntity>;
    getPendingOrderByUserId(userId: number): Promise<PendingOrderEntity | null>;
    updateOrderStatus(orderId: number, status: number): Promise<boolean>;
    deleteCartByUserId(userId: number): Promise<boolean>;
}
export declare const PAYMENT_REPOSITORY: unique symbol;
