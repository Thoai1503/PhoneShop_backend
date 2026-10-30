import { PrismaService } from '../database/prisma.service.js';
import type { ICartRepository } from '../../domain/repositories/icart.repository.js';
import type { CartEntity } from '../../domain/entities/cart/cart.entity.js';
export declare class CartRepository implements ICartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: {
        user_id: number;
        variant_id: number;
        quantity: number;
        unit_price?: number | null;
    }): Promise<number>;
    updateQuantity(id: number, quantity: number): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    deleteByUserId(userId: number): Promise<boolean>;
    findByUserId(userId: number): Promise<CartEntity[]>;
}
