import { PrismaService } from '../database/prisma.service.js';
type CartItem = {
    variant_id: number;
    quantity: number;
    unit_price: unknown;
};
export declare class PaymentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartItemsByUserId(userId: number): Promise<CartItem[]>;
    createOrderFromCart(payload: {
        userId: number;
        amount: number;
        addressId?: number | null;
    }): Promise<{
        orderId: number;
        cartCount: number;
    }>;
    getPendingOrderByUserId(userId: number): Promise<{
        id: number;
        status: number;
        created_at: Date;
        user_id: number;
        discount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        address_id: number | null;
    } | null>;
    updateOrderStatus(orderId: number, status: number): Promise<boolean>;
    deleteCartByUserId(userId: number): Promise<boolean>;
}
export {};
