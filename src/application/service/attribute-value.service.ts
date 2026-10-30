import { Inject, Injectable } from '@nestjs/common';
import {
  ATTRIBUTE_VALUE_REPOSITORY,
  type IAttributeValueRepository,
} from '../../domain/repositories/iattribute.repository.js';
import type { IAttributeValueService } from '../../domain/services/iattribute.service.js';
import type { AttributeValueEntity } from '../../domain/entities/attributes/attribute.entity.js';

@Injectable()
export class AttributeValueService implements IAttributeValueService {
  constructor(
    @Inject(ATTRIBUTE_VALUE_REPOSITORY)
    private readonly repo: IAttributeValueRepository,
  ) {}

  async findById(id: number): Promise<AttributeValueEntity | null> {
    return this.repo.findById(id);
  }

  async getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]> {
    return this.repo.getByAttributeId(attributeId);
  }
}
