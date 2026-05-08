import { PrismaService } from '../database/prisma.service';
import { CartDTO } from "../../api/dto/product.dto";
export declare class CartRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
