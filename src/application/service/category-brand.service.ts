import { Inject, Injectable } from '@nestjs/common';
import {
  CATEGORY_BRAND_REPOSITORY,
  type ICategoryBrandRepository,
} from '../../domain/repositories/icategory.repository.js';
import type { ICategoryBrandService } from '../../domain/services/icategory.service.js';
import type { CategoryBrandEntity } from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryBrandService implements ICategoryBrandService {
  constructor(
    @Inject(CATEGORY_BRAND_REPOSITORY)
    private readonly repo: ICategoryBrandRepository,
  ) {}

  async getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]> {
    return this.repo.getByCategory(categorySlug);
  }
}
