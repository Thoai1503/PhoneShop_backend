import { Inject, Injectable } from '@nestjs/common';
import {
  ATTRIBUTE_REPOSITORY,
  type IAttributeRepository,
} from '../../domain/repositories/iattribute.repository.js';
import type { IAttributeService } from '../../domain/services/iattribute.service.js';
import type { AttributeEntity } from '../../domain/entities/attributes/attribute.entity.js';

@Injectable()
export class AttributeService implements IAttributeService {
  constructor(
    @Inject(ATTRIBUTE_REPOSITORY)
    private readonly attributeRepo: IAttributeRepository,
  ) {}

  async getAll(): Promise<AttributeEntity[]> {
    return this.attributeRepo.getAll();
  }

  async create(entity: AttributeEntity): Promise<boolean> {
    return this.attributeRepo.create(entity);
  }

  async getByCategoryId(categoryId: number): Promise<AttributeEntity[]> {
    return this.attributeRepo.getByCategoryId(categoryId);
  }
}
