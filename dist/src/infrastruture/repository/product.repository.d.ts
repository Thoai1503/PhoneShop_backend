import { PrismaService } from '../database/prisma.service.js';
import type { IProductRepository } from '../../domain/repositories/iproduct.repository.js';
import type { ProductContentComparisonEntity, ProductContentRestoreEntity, ProductContentResultEntity, ProductContentVersionEntity, ProductContentVersionsEntity, ProductContentVersionStatusEntity, ProductCreateEntity, ProductEntity, ProductUpdateEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductRepository implements IProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<ProductEntity[]>;
    findById(id: number): Promise<ProductEntity | null>;
    createAndReturn(product: ProductCreateEntity): Promise<ProductEntity | null>;
    updateAndReturn(id: number, product: ProductUpdateEntity): Promise<ProductEntity | null>;
    saveHtmlContentByProductId(productId: number, html: string, locale?: string, changeNote?: string | null): Promise<ProductContentResultEntity | null>;
    getHtmlContentByProductId(productId: number): Promise<string | null>;
    getPublishedHtmlContentByProductId(productId: number): Promise<string | null>;
    getVersionsList(productId: number, locale?: string): Promise<ProductContentVersionsEntity | null>;
    getVersionDetail(productId: number, versionId: number, locale?: string): Promise<ProductContentVersionEntity | null>;
    publishVersion(productId: number, versionId: number, locale?: string): Promise<ProductContentVersionStatusEntity | null>;
    restoreVersion(productId: number, versionId: number, locale?: string): Promise<ProductContentRestoreEntity | null>;
    deleteVersion(productId: number, versionId: number, locale?: string): Promise<boolean>;
    compareVersions(productId: number, versionId1: number, versionId2: number, locale?: string): Promise<ProductContentComparisonEntity | null>;
}
