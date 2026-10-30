import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_ATTRIBUTE_REPOSITORY,
  type ICategoryAttributeRepository,
} from '../../domain/repositories/icategory.repository.js';
import type { ICategoryAttributeService } from '../../domain/services/icategory.service.js';
import type {
  CategoryAttributeEntity,
  CategoryAttributeUpdateEntity,
} from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryAttributeService implements ICategoryAttributeService {
  constructor(
    @Inject(CATEGORY_ATTRIBUTE_REPOSITORY)
    private readonly repo: ICategoryAttributeRepository,
  ) {}

  async getAll(): Promise<CategoryAttributeEntity[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<CategoryAttributeEntity | null> {
    return this.repo.findById(id);
  }

  async create(entity: CategoryAttributeEntity): Promise<boolean> {
    return this.repo.create(entity);
  }

  async update(
    id: number,
    updateState: CategoryAttributeUpdateEntity,
  ): Promise<{ success: boolean; entity?: CategoryAttributeEntity }> {
    const entity = await this.repo.findById(id);
    if (!entity) return { success: false };
    entity.category_id = updateState.category_id;
    entity.attribute_id = updateState.attribute_id;
    entity.is_filterable = updateState.is_filterable;
    entity.is_variant_level = updateState.is_variant_level;
    entity.is_required = updateState.is_required;
    const result = await this.repo.update(entity);
    if (!result) return { success: false };
    return { success: true, entity };
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }

  async getByCategory(
    categorySlug: string,
  ): Promise<CategoryAttributeEntity[]> {
    return this.repo.getByCategory(categorySlug);
  }

  async createMultiple(
    categoryId: number,
    attributeIds: number[],
  ): Promise<{ success: boolean; failedId?: number }> {
    for (const attrId of attributeIds) {
      const result = await this.repo.create({
        attribute_id: attrId,
        category_id: categoryId,
        id: 0,
        is_filterable: false,
        is_variant_level: false,
        is_required: false,
      });
      if (!result) return { success: false, failedId: attrId };
    }
    return { success: true };
  }
}
