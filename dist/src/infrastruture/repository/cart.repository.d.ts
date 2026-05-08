import { PrismaService } from '../database/prisma.service.js';
import { CartDTO } from '../../api/dto/product.dto.js';
export declare class CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
