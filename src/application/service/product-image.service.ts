import { Injectable } from '@nestjs/common';
import { ProductImageRepository } from '../../infrastruture/repository/product-image.repository.js';
import { ProductImageDTO } from '../../api/dto/product.dto.js';

@Injectable()
export class ProductImageService {
  constructor(private readonly repo: ProductImageRepository) {}

  async create(entity: ProductImageDTO): Promise<boolean> {
    return this.repo.create(entity);
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }

  async getByVariantId(variantId: number): Promise<ProductImageDTO[]> {
    return this.repo.getByVariantId(variantId);
  }
}
