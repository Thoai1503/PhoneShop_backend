import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryBrandRepository } from '../../domain/repositories/icategory.repository.js';
import type { CategoryBrandEntity } from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryBrandRepository implements ICategoryBrandRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]> {
    const list = await this.prisma.category_brands.findMany({
      where: { categories: { slug: categorySlug } },
      include: { categories: true, brands: true },
    });
    return list.map((cb) => {
      return {
        id: cb.id,
        category_id: cb.category_id,
        brand_id: cb.brand_id,
        category: {
          id: cb.category_id,
          name: cb.categories.name?.trim() ?? '',
          slug: cb.categories.slug?.trim() ?? '',
          path: '',
        },
        brand: {
          id: cb.brand_id,
          name: cb.brands.name?.trim() ?? '',
          slug: cb.brands.slug?.trim() ?? '',
        },
      };
    });
  }
}
