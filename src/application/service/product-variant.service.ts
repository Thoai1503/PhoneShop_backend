import { Injectable } from '@nestjs/common';
import { ProductVariantRepository } from '../../infrastruture/repository/product-variant.repository.js';
import {
  FilterStateDTO,
  ProductVariantDTO,
  ProductVariantPaginatedDTO,
} from '../../api/dto/product.dto.js';

@Injectable()
export class ProductVariantService {
  constructor(private readonly repo: ProductVariantRepository) {}

  async getPaginationData(
    st: FilterStateDTO,
  ): Promise<ProductVariantPaginatedDTO> {
    return this.repo.getPaginationData(st);
  }

  async findById(id: number): Promise<ProductVariantDTO | null> {
    return this.repo.findById(id);
  }

  async create(entity: ProductVariantDTO): Promise<boolean> {
    return this.repo
      .create(entity)
      .then((res) => res)
      .catch((er) => {
        console.error('Error creating product variant:', er);
        return false;
      });
  }

  async update(entity: ProductVariantDTO): Promise<boolean> {
    return this.repo.update(entity);
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }

  async findByProductId(productId: number): Promise<ProductVariantDTO[]> {
    return this.repo.findByProductId(productId);
  }
}
