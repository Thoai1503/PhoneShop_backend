import { BrandDTO } from './brand.dto.js';
import { CategoryDTO } from './category.dto.js';

export class CategoryBrandDTO {
  id: number = 0;
  brand_id: number = 0;
  category_id: number = 0;
  category?: CategoryDTO | null = null;
  brand?: BrandDTO | null = null;
}
