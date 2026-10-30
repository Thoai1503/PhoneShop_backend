import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_REPOSITORY,
  type ICategoryRepository,
} from '../../domain/repositories/icategory.repository.js';
import type { ICategoryService } from '../../domain/services/icategory.service.js';
import type { CategoryEntity } from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  getAll(): Promise<CategoryEntity[]> {
    return this.categoryRepository.findAll();
  }

  findById(id: number): Promise<CategoryEntity | null> {
    return this.categoryRepository.findById(id);
  }

  createCategory(categoryData: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryRepository.create(categoryData);
  }

  updateCategory(
    id: number,
    categoryData: CategoryEntity,
  ): Promise<CategoryEntity | null> {
    return this.categoryRepository.update(id, categoryData);
  }

  deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.deleteById(id);
  }
}
