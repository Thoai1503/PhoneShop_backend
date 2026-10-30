import type { ProductAttributeEntity } from '../entities/products/product.entity.js';
import type { ProductImageEntity } from '../entities/products/product.entity.js';
import type {
  FilterStateEntity,
  ProductContentComparisonEntity,
  ProductContentRestoreEntity,
  ProductContentResultEntity,
  ProductContentVersionEntity,
  ProductContentVersionsEntity,
  ProductContentVersionStatusEntity,
  ProductCreateEntity,
  ProductEntity,
  ProductUpdateEntity,
  ProductVariantEntity,
  ProductVariantPaginatedEntity,
  VariantAttributeEntity,
} from '../entities/products/product.entity.js';

export interface IProductAttributeRepository {
  findById(id: number): Promise<ProductAttributeEntity | null>;
  update(id: number, entity: ProductAttributeEntity): Promise<boolean>;
}
export const PRODUCT_ATTRIBUTE_REPOSITORY = Symbol(
  'PRODUCT_ATTRIBUTE_REPOSITORY',
);

export interface IProductImageRepository {
  create(entity: ProductImageEntity): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  getByVariantId(variantId: number): Promise<ProductImageEntity[]>;
}
export const PRODUCT_IMAGE_REPOSITORY = Symbol('PRODUCT_IMAGE_REPOSITORY');

export interface IProductVariantRepository {
  create(entity: ProductVariantEntity): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  findById(id: number): Promise<ProductVariantEntity | null>;
  update(entity: ProductVariantEntity): Promise<boolean>;
  findByProductId(productId: number): Promise<ProductVariantEntity[]>;
  getPaginationData(
    state: FilterStateEntity,
  ): Promise<ProductVariantPaginatedEntity>;
}
export const PRODUCT_VARIANT_REPOSITORY = Symbol('PRODUCT_VARIANT_REPOSITORY');

export interface IVariantAttributeRepository {
  getAll(): Promise<VariantAttributeEntity[]>;
  updateFromList(list: VariantAttributeEntity[]): Promise<boolean>;
}
export const VARIANT_ATTRIBUTE_REPOSITORY = Symbol(
  'VARIANT_ATTRIBUTE_REPOSITORY',
);

export interface IProductRepository {
  getAll(): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity | null>;
  createAndReturn(product: ProductCreateEntity): Promise<ProductEntity | null>;
  updateAndReturn(
    id: number,
    product: ProductUpdateEntity,
  ): Promise<ProductEntity | null>;
  saveHtmlContentByProductId(
    productId: number,
    html: string,
    locale?: string,
    changeNote?: string | null,
  ): Promise<ProductContentResultEntity | null>;
  getHtmlContentByProductId(productId: number): Promise<string | null>;
  getPublishedHtmlContentByProductId(productId: number): Promise<string | null>;
  getVersionsList(
    productId: number,
    locale?: string,
  ): Promise<ProductContentVersionsEntity | null>;
  getVersionDetail(
    productId: number,
    versionId: number,
    locale?: string,
  ): Promise<ProductContentVersionEntity | null>;
  publishVersion(
    productId: number,
    versionId: number,
    locale?: string,
  ): Promise<ProductContentVersionStatusEntity | null>;
  restoreVersion(
    productId: number,
    versionId: number,
    locale?: string,
  ): Promise<ProductContentRestoreEntity | null>;
  deleteVersion(
    productId: number,
    versionId: number,
    locale?: string,
  ): Promise<boolean>;
  compareVersions(
    productId: number,
    versionId1: number,
    versionId2: number,
    locale?: string,
  ): Promise<ProductContentComparisonEntity | null>;
}
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
