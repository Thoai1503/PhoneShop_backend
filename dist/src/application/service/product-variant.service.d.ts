import { type IProductVariantRepository } from '../../domain/repositories/iproduct.repository.js';
import type { IProductVariantService } from '../../domain/services/iproduct.service.js';
import type { FilterStateEntity, ProductVariantEntity, ProductVariantPaginatedEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductVariantService implements IProductVariantService {
    private readonly repo;
    constructor(repo: IProductVariantRepository);
    getPaginationData(st: FilterStateEntity): Promise<ProductVariantPaginatedEntity>;
    findById(id: number): Promise<ProductVariantEntity | null>;
    create(entity: ProductVariantEntity): Promise<boolean>;
    update(entity: ProductVariantEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantEntity[]>;
}
