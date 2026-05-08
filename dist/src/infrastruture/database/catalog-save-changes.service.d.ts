import { Prisma, category_attributes } from '@prisma/client';
import { PrismaService } from './prisma.service';
type TxClient = Prisma.TransactionClient;
export declare class CatalogSaveChangesService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    runInTransaction<T>(handler: (tx: TxClient) => Promise<T>): Promise<T>;
    prepareCategoryForWrite(category: {
        name: string;
        parent_id?: number | null;
    }, tx?: TxClient): Promise<{
        slug: string;
        level: number;
        path: string;
    }>;
    prepareAttributeSlug(name: string): string;
    prepareProductSlug(name: string): string;
    prepareBrandSlug(name: string): string;
    afterProductVariantCreated(variantId: number, tx?: TxClient): Promise<void>;
    deleteProductVariantCascade(variantId: number, tx?: TxClient): Promise<void>;
    afterCategoryAttributeCreated(categoryAttributeId: number, tx?: TxClient): Promise<void>;
    onCategoryAttributeVariantLevelChanged(categoryAttributeId: number, oldIsVariantLevel: boolean, newIsVariantLevel: boolean, tx?: TxClient): Promise<void>;
    onCategoryAttributeDeleted(categoryAttribute: Pick<category_attributes, 'attribute_id' | 'category_id' | 'is_variant_level'>, tx?: TxClient): Promise<void>;
    onProductDeleted(productId: number, tx?: TxClient): Promise<void>;
    private syncCategoryAttributeInsert;
    private getProductIdsByCategory;
    private getVariantIdsByProductIds;
    private createMissingProductAttributes;
    private createMissingVariantAttributes;
    private removeVietnameseDiacritics;
    private slugify;
}
export {};
