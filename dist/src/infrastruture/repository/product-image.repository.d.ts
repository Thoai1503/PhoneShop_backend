import { PrismaService } from '../database/prisma.service.js';
import { ProductImageDTO } from '../../api/dto/product.dto.js';
export declare class ProductImageRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(entity: ProductImageDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByVariantId(variantId: number): Promise<ProductImageDTO[]>;
}
