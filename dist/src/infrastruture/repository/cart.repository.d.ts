import { PrismaService } from '../database/prisma.service.js';
import { CartDTO } from '../../api/dto/product.dto.js';
export declare class CartRepository {
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
    findByUserId(userId: number): Promise<CartDTO[]>;
}
