import { PrismaService } from '../database/prisma.service.js';
import type { IProductImageRepository } from '../../domain/repositories/iproduct.repository.js';
import type { ProductImageEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductImageRepository implements IProductImageRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(entity: ProductImageEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByVariantId(variantId: number): Promise<ProductImageEntity[]>;
}
