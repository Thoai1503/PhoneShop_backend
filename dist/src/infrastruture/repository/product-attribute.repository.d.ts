import { PrismaService } from '../database/prisma.service.js';
import type { IProductAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { ProductAttributeEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductAttributeRepository implements IProductAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<ProductAttributeEntity | null>;
    update(id: number, entity: ProductAttributeEntity): Promise<boolean>;
}
