import type {
  FilterStateEntity,
  ProductAttributeEntity,
  ProductImageEntity,
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

export interface IProductAttributeService {
  update(id: number, entity: ProductAttributeEntity): Promise<boolean>;
}

export interface IProductImageService {
  create(entity: ProductImageEntity): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  getByVariantId(variantId: number): Promise<ProductImageEntity[]>;
}

export interface IProductVariantService {
  getPaginationData(
    state: FilterStateEntity,
  ): Promise<ProductVariantPaginatedEntity>;
  findById(id: number): Promise<ProductVariantEntity | null>;
  create(entity: ProductVariantEntity): Promise<boolean>;
  update(entity: ProductVariantEntity): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  findByProductId(productId: number): Promise<ProductVariantEntity[]>;
}

export interface IProductService {
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

export interface IVariantAttributeService {
  getAll(): Promise<VariantAttributeEntity[]>;
  updateFromList(list: VariantAttributeEntity[]): Promise<boolean>;
}
