import { Inject, Injectable } from '@nestjs/common';
import {
  VARIANT_ATTRIBUTE_REPOSITORY,
  type IVariantAttributeRepository,
} from '../../domain/repositories/iproduct.repository.js';
import type { IVariantAttributeService } from '../../domain/services/iproduct.service.js';
import type { VariantAttributeEntity } from '../../domain/entities/products/product.entity.js';

@Injectable()
export class VariantAttributeService implements IVariantAttributeService {
  constructor(
    @Inject(VARIANT_ATTRIBUTE_REPOSITORY)
    private readonly repo: IVariantAttributeRepository,
  ) {}

  async getAll(): Promise<VariantAttributeEntity[]> {
    return this.repo.getAll();
  }

  async updateFromList(list: VariantAttributeEntity[]): Promise<boolean> {
    return this.repo.updateFromList(list);
  }
}
