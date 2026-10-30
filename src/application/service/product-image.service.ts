import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_IMAGE_REPOSITORY,
  type IProductImageRepository,
} from '../../domain/repositories/iproduct.repository.js';
import type { IProductImageService } from '../../domain/services/iproduct.service.js';
import type { ProductImageEntity } from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductImageService implements IProductImageService {
  constructor(
    @Inject(PRODUCT_IMAGE_REPOSITORY)
    private readonly repo: IProductImageRepository,
  ) {}

  async create(entity: ProductImageEntity): Promise<boolean> {
    return this.repo.create(entity);
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }

  async getByVariantId(variantId: number): Promise<ProductImageEntity[]> {
    return this.repo.getByVariantId(variantId);
  }
}
