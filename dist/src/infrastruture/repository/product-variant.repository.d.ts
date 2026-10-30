import { PrismaService } from '../database/prisma.service.js';
import { CatalogSaveChangesService } from '../database/catalog-save-changes.service.js';
import type { IProductVariantRepository } from '../../domain/repositories/iproduct.repository.js';
import type { FilterStateEntity, ProductVariantEntity, ProductVariantPaginatedEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductVariantRepository implements IProductVariantRepository {
    private readonly prisma;
    private readonly catalogSaveChangesService;
    constructor(prisma: PrismaService, catalogSaveChangesService: CatalogSaveChangesService);
    create(entity: ProductVariantEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<ProductVariantEntity | null>;
    update(entity: ProductVariantEntity): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantEntity[]>;
    getPaginationData(st: FilterStateEntity): Promise<ProductVariantPaginatedEntity>;
    private toEntity;
}
