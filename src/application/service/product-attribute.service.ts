import { Injectable } from '@nestjs/common';
import { ProductAttributeRepository } from 'src/infrastruture/repository/product-attribute.repository';
import { ProductAttributeDTO } from '../../api/dto/product.dto';

@Injectable()
export class ProductAttributeService {
  constructor(private readonly repo: ProductAttributeRepository) {}

  async update(id: number, entity: ProductAttributeDTO): Promise<boolean> {
    const existing = await this.repo.findById(id);
    if (!existing) return false;
    return this.repo.update(id, entity);
  }
}
