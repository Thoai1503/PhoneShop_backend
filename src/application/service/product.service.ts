import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '../../domain/repositories/iproduct.repository.js';
import type { IProductService } from '../../domain/services/iproduct.service.js';
import type {
  ProductCreateEntity,
  ProductContentComparisonEntity,
  ProductContentResultEntity,
  ProductContentRestoreEntity,
  ProductContentVersionEntity,
  ProductContentVersionsEntity,
  ProductContentVersionStatusEntity,
  ProductEntity,
  ProductUpdateEntity,
} from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: IProductRepository,
  ) {}

  async getAll(): Promise<ProductEntity[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<ProductEntity | null> {
    return this.repo.findById(id);
  }

  async createAndReturn(
    product: ProductCreateEntity,
  ): Promise<ProductEntity | null> {
    return this.repo.createAndReturn(product);
  }

  async updateAndReturn(
    id: number,
    product: ProductUpdateEntity,
  ): Promise<ProductEntity | null> {
    return this.repo.updateAndReturn(id, product);
  }

  async saveHtmlContentByProductId(
    productId: number,
    html: string,
    locale = 'vi',
    changeNote?: string | null,
  ): Promise<ProductContentResultEntity | null> {
    return this.repo.saveHtmlContentByProductId(
      productId,
      html,
      locale,
      changeNote,
    );
  }

  async getHtmlContentByProductId(productId: number): Promise<string | null> {
    return this.repo.getHtmlContentByProductId(productId);
  }

  async getPublishedHtmlContentByProductId(
    productId: number,
  ): Promise<string | null> {
    return this.repo.getPublishedHtmlContentByProductId(productId);
  }

  async getVersionsList(
    productId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionsEntity | null> {
    return this.repo.getVersionsList(productId, locale);
  }

  async getVersionDetail(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionEntity | null> {
    return this.repo.getVersionDetail(productId, versionId, locale);
  }

  async publishVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionStatusEntity | null> {
    return this.repo.publishVersion(productId, versionId, locale);
  }

  async restoreVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentRestoreEntity | null> {
    return this.repo.restoreVersion(productId, versionId, locale);
  }

  async deleteVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<boolean> {
    return this.repo.deleteVersion(productId, versionId, locale);
  }

  async compareVersions(
    productId: number,
    versionId1: number,
    versionId2: number,
    locale = 'vi',
  ): Promise<ProductContentComparisonEntity | null> {
    return this.repo.compareVersions(productId, versionId1, versionId2, locale);
  }
}
