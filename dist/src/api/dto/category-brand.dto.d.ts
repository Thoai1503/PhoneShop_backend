import { BrandDTO } from './brand.dto.js';
import { CategoryDTO } from './category.dto.js';
export declare class CategoryBrandDTO {
    id: number;
    brand_id: number;
    category_id: number;
    category?: CategoryDTO | null;
    brand?: BrandDTO | null;
}
