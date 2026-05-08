import { Controller, Get, Param } from '@nestjs/common';
import { CategoryBrandService } from '../../application/service/category-brand.service.js';
import { CategoryBrandDTO } from '../dto/category-brand.dto.js';

@Controller('api/categorybrand')
export class CategoryBrandController {
  constructor(private readonly service: CategoryBrandService) {}

  // GET api/categorybrand/category/:category
  @Get('category/:category')
  async getByCategory(
    @Param('category') category: string,
  ): Promise<CategoryBrandDTO[]> {
    return this.service.getByCategory(category);
  }
}
