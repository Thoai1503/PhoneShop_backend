import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_ATTRIBUTE_REPOSITORY,
  type IProductAttributeRepository,
} from '../../domain/repositories/iproduct.repository.js';
import type { IProductAttributeService } from '../../domain/services/iproduct.service.js';
import type { ProductAttributeEntity } from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductAttributeService implements IProductAttributeService {
  constructor(
    @Inject(PRODUCT_ATTRIBUTE_REPOSITORY)
    private readonly repo: IProductAttributeRepository,
  ) {}

  async update(id: number, entity: ProductAttributeEntity): Promise<boolean> {
    const existing = await this.repo.findById(id);
    if (!existing) return false;
    return this.repo.update(id, entity);
  }
}
