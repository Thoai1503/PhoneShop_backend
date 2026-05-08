import { BrandDTO } from './brand.dto';
import { CategoryDTO } from './category.dto';
export declare class CategoryBrandDTO {
    id: number;
    brand_id: number;
    category_id: number;
    category?: CategoryDTO | null;
    brand?: BrandDTO | null;
}
