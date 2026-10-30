import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_VARIANT_REPOSITORY,
  type IProductVariantRepository,
} from '../../domain/repositories/iproduct.repository.js';
import type { IProductVariantService } from '../../domain/services/iproduct.service.js';
import type {
  FilterStateEntity,
  ProductVariantEntity,
  ProductVariantPaginatedEntity,
} from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductVariantService implements IProductVariantService {
  constructor(
    @Inject(PRODUCT_VARIANT_REPOSITORY)
    private readonly repo: IProductVariantRepository,
  ) {}

  async getPaginationData(
    st: FilterStateEntity,
  ): Promise<ProductVariantPaginatedEntity> {
    return this.repo.getPaginationData(st);
  }

  async findById(id: number): Promise<ProductVariantEntity | null> {
    return this.repo.findById(id);
  }

  async create(entity: ProductVariantEntity): Promise<boolean> {
    return this.repo
      .create(entity)
      .then((res) => res)
      .catch((er) => {
        console.error('Error creating product variant:', er);
        return false;
      });
  }

  async update(entity: ProductVariantEntity): Promise<boolean> {
    return this.repo.update(entity);
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }

  async findByProductId(productId: number): Promise<ProductVariantEntity[]> {
    return this.repo.findByProductId(productId);
  }
}
