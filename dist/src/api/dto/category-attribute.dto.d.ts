import { AttributeDTO } from './attribute.dto';
import { CategoryDTO } from './category.dto';
export declare class CategoryAttributeDTO {
    id: number;
    category_id: number;
    attribute_id: number;
    is_filterable: boolean;
    is_variant_level: boolean;
    is_required: boolean;
    category?: CategoryDTO | null;
    attribute?: AttributeDTO | null;
}
export declare class CategoryAttributeUpdateStateDTO {
    id: number;
    category_id: number;
    attribute_id: number;
    is_filterable: boolean;
    is_variant_level: boolean;
    is_required: boolean;
}
