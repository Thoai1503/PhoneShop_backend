import { PrismaService } from '../database/prisma.service.js';
import type { IPaymentRepository } from '../../domain/repositories/ipayment.repository.js';
import type { PaymentCartItemEntity, PendingOrderEntity } from '../../domain/entities/payments/payment.entity.js';
export declare class PaymentRepository implements IPaymentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartItemsByUserId(userId: number): Promise<PaymentCartItemEntity[]>;
    createOrderFromCart(payload: {
        userId: number;
        amount: number;
        addressId?: number | null;
    }): Promise<{
        orderId: number;
        cartCount: number;
    }>;
    getPendingOrderByUserId(userId: number): Promise<PendingOrderEntity | null>;
    updateOrderStatus(orderId: number, status: number): Promise<boolean>;
    deleteCartByUserId(userId: number): Promise<boolean>;
}
