import { type IProductImageRepository } from '../../domain/repositories/iproduct.repository.js';
import type { IProductImageService } from '../../domain/services/iproduct.service.js';
import type { ProductImageEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductImageService implements IProductImageService {
    private readonly repo;
    constructor(repo: IProductImageRepository);
    create(entity: ProductImageEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByVariantId(variantId: number): Promise<ProductImageEntity[]>;
}
