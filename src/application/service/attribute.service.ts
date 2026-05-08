import { Injectable } from '@nestjs/common';
import { AttributeRepository } from '../../infrastruture/repository/attribute.repository.js';
import { AttributeDTO } from '../../api/dto/attribute.dto.js';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepo: AttributeRepository) {}

  async getAll(): Promise<AttributeDTO[]> {
    return this.attributeRepo.getAll();
  }

  async create(entity: AttributeDTO): Promise<boolean> {
    return this.attributeRepo.create(entity);
  }

  async getByCategoryId(categoryId: number): Promise<AttributeDTO[]> {
    return this.attributeRepo.getByCategoryId(categoryId);
  }
}
