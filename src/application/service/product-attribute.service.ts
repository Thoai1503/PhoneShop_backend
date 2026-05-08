import { Injectable } from '@nestjs/common';
import { ProductAttributeRepository } from '../../infrastruture/repository/product-attribute.repository.js';
import { ProductAttributeDTO } from '../../api/dto/product.dto.js';

@Injectable()
export class ProductAttributeService {
  constructor(private readonly repo: ProductAttributeRepository) {}

  async update(id: number, entity: ProductAttributeDTO): Promise<boolean> {
    const existing = await this.repo.findById(id);
    if (!existing) return false;
    return this.repo.update(id, entity);
  }
}
