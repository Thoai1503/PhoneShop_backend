import { Injectable } from '@nestjs/common';
import { CategoryAttributeRepository } from 'src/infrastruture/repository/category-attribute.repository';
import {
  CategoryAttributeDTO,
  CategoryAttributeUpdateStateDTO,
} from 'src/api/dto/category-attribute.dto';

@Injectable()
export class CategoryAttributeService {
  constructor(private readonly repo: CategoryAttributeRepository) {}

  async getAll(): Promise<CategoryAttributeDTO[]> {
    return this.repo.getAll();
  }

  async findById(id: number): Promise<CategoryAttributeDTO | null> {
    return this.repo.findById(id);
  }

  async create(entity: CategoryAttributeDTO): Promise<boolean> {
    return this.repo.create(entity);
  }

  async update(
    id: number,
    updateState: CategoryAttributeUpdateStateDTO,
  ): Promise<{ success: boolean; entity?: CategoryAttributeDTO }> {
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

  async getByCategory(categorySlug: string): Promise<CategoryAttributeDTO[]> {
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
