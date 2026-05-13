import { AttributeDTO, AttributeValueDTO } from './attribute.dto.js';
import { BrandDTO } from './brand.dto.js';
import { CategoryDTO } from './category.dto.js';
export declare class ProductAttributeDTO {
    id: number;
    product_id: number;
    attribute_id: number;
    value_text?: string | null;
    value_decimal?: number | null;
    value_int?: number | null;
    attribute_value_id?: number | null;
    attribute?: AttributeDTO | null;
}
export declare class ProductImageDTO {
    id: number;
    product_id: number;
    variant_id: number;
    url?: string | null;
}
export declare class VariantAttributeDTO {
    id: number;
    attribute_id: number;
    variant_id: number;
    value_int?: number | null;
    value_text?: string | null;
    value_decimal?: number | null;
    attribute_value_id?: number | null;
    attribute_value?: AttributeValueDTO | null;
    attribute?: AttributeDTO | null;
}
export declare class ProductVariantDTO {
    id: number;
    product_id: number;
    sku: string;
    name: string;
    price: number;
    status: number;
    created_at?: Date | null;
    product?: ProductDTO | null;
    product_images?: ProductImageDTO[] | null;
    variant_attributes?: VariantAttributeDTO[] | null;
}
export declare class ProductDTO {
    id: number;
    name: string;
    description: string;
    category_id: number;
    brand_id: number;
    slug: string;
    rating: number;
    status: number;
    created_at?: Date | null;
    category?: CategoryDTO | null;
    brand?: BrandDTO | null;
    product_attribute?: ProductAttributeDTO[];
    product_variant?: ProductVariantDTO[];
}
export declare class ProductAddAndUpdateStateDTO {
    id: number;
    name: string;
    description: string;
    category_id: number;
    brand_id: number;
    slug: string;
    rating: number;
    status: number;
}
export declare class SaveProductContentDTO {
    html: string;
    locale?: string;
    change_note?: string | null;
}
export declare class SaveProductContentResultDTO {
    product_id: number;
    locale: string;
    product_content_id: number;
    draft_version_id: number;
    version_number: number;
}
export declare class ProductVariantPaginatedDTO {
    data: ProductVariantDTO[];
    count: number;
    max: number;
    min: number;
}
export declare class FilterStateDTO {
    skip: number;
    take: number;
    sortBy: string;
    order: string;
    category: string;
    attributes: Record<string, string[]>;
    categoryIds: number[];
    brandIds: number[];
    minPrice?: number | null;
    maxPrice?: number | null;
}
export declare class CartDTO {
    id: number;
    user_id: number;
    variant_id: number;
    quantity: number;
    unit_price?: number | null;
    variant?: ProductVariantDTO | null;
}
