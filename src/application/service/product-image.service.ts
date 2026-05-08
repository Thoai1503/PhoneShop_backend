import { Injectable } from '@nestjs/common';
import { ProductImageRepository } from 'src/infrastruture/repository/product-image.repository';
import { ProductImageDTO } from '../../api/dto/product.dto';

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
