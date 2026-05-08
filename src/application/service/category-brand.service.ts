import { Injectable } from '@nestjs/common';
import { CategoryBrandRepository } from '../../infrastruture/repository/category-brand.repository';
import { CategoryBrandDTO } from '../../api/dto/category-brand.dto';

@Injectable()
export class CategoryBrandService {
  constructor(private readonly repo: CategoryBrandRepository) {}

  async getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]> {
    return this.repo.getByCategory(categorySlug);
  }
}
