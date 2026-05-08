import { BrandDTO } from './brand.dto';
import { CategoryDTO } from './category.dto';

export class CategoryBrandDTO {
  id: number = 0;
  brand_id: number = 0;
  category_id: number = 0;
  category?: CategoryDTO | null = null;
  brand?: BrandDTO | null = null;
}
