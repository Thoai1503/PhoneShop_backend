import { Injectable } from '@nestjs/common';
import { VariantAttributeRepository } from '../../infrastruture/repository/variant-attribute.repository';
import { VariantAttributeDTO } from '../../api/dto/product.dto';

@Injectable()
export class VariantAttributeService {
  constructor(private readonly repo: VariantAttributeRepository) {}

  async getAll(): Promise<VariantAttributeDTO[]> {
    return this.repo.getAll();
  }

  async updateFromList(list: VariantAttributeDTO[]): Promise<boolean> {
    return this.repo.updateFromList(list);
  }
}
