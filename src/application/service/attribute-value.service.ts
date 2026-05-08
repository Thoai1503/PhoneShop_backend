import { Injectable } from '@nestjs/common';
import { AttributeValueRepository } from '../../infrastruture/repository/attribute-value.repository.js';
import { AttributeValueDTO } from '../../api/dto/attribute.dto.js';

@Injectable()
export class AttributeValueService {
  constructor(private readonly repo: AttributeValueRepository) {}

  async findById(id: number): Promise<AttributeValueDTO | null> {
    return this.repo.findById(id);
  }

  async getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]> {
    return this.repo.getByAttributeId(attributeId);
  }
}
