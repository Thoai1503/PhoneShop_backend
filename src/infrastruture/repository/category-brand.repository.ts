import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoryBrandDTO } from 'src/api/dto/category-brand.dto';
import { CategoryDTO } from 'src/api/dto/category.dto';
import { BrandDTO } from 'src/api/dto/brand.dto';

@Injectable()
export class CategoryBrandRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]> {
    const list = await this.prisma.category_brands.findMany({
      where: { categories: { slug: categorySlug } },
      include: { categories: true, brands: true },
    });
    return list.map((cb) => {
      const dto = new CategoryBrandDTO();
      dto.id = cb.id;
      dto.category_id = cb.category_id;
      dto.brand_id = cb.brand_id;

      const cat = new CategoryDTO();
      cat.id = cb.category_id;
      cat.name = cb.categories.name?.trim() ?? '';
      cat.slug = cb.categories.slug?.trim() ?? '';
      dto.category = cat;

      const brand = new BrandDTO();
      brand.id = cb.brand_id;
      brand.name = cb.brands.name?.trim() ?? '';
      brand.slug = cb.brands.slug?.trim() ?? '';
      dto.brand = brand;

      return dto;
    });
  }
}
