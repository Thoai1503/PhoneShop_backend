import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastruture/repository/product.repository.js';
import {
  ProductDTO,
  ProductAddAndUpdateStateDTO,
  ProductUpdateDTO,
  SaveProductContentResultDTO,
} from '../../api/dto/product.dto.js';

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepository) {}

  async getAll(): Promise<ProductDTO[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<ProductDTO | null> {
    return this.repo.findById(id);
  }

  async createAndReturn(
    product: ProductAddAndUpdateStateDTO,
  ): Promise<ProductDTO | null> {
    return this.repo.createAndReturn(product);
  }

  async updateAndReturn(
    id: number,
    product: ProductUpdateDTO,
  ): Promise<ProductDTO | null> {
    return this.repo.updateAndReturn(id, product);
  }

  async saveHtmlContentByProductId(
    productId: number,
    html: string,
    locale = 'vi',
    changeNote?: string | null,
  ): Promise<SaveProductContentResultDTO | null> {
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

  async getVersionsList(productId: number, locale = 'vi') {
    return this.repo.getVersionsList(productId, locale);
  }

  async getVersionDetail(productId: number, versionId: number, locale = 'vi') {
    return this.repo.getVersionDetail(productId, versionId, locale);
  }

  async publishVersion(productId: number, versionId: number, locale = 'vi') {
    return this.repo.publishVersion(productId, versionId, locale);
  }

  async restoreVersion(productId: number, versionId: number, locale = 'vi') {
    return this.repo.restoreVersion(productId, versionId, locale);
  }

  async deleteVersion(productId: number, versionId: number, locale = 'vi') {
    return this.repo.deleteVersion(productId, versionId, locale);
  }

  async compareVersions(
    productId: number,
    versionId1: number,
    versionId2: number,
    locale = 'vi',
  ) {
    return this.repo.compareVersions(productId, versionId1, versionId2, locale);
  }
}
