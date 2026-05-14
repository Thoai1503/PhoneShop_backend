import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AttributeDTO, AttributeValueDTO } from './attribute.dto.js';
import { BrandDTO } from './brand.dto.js';
import { CategoryAttributeDTO } from './category-attribute.dto.js';
import { CategoryDTO } from './category.dto.js';

export class ProductAttributeDTO {
  id: number = 0;
  product_id: number = 0;
  attribute_id: number = 0;
  value_text?: string | null = null;
  value_decimal?: number | null = null;
  value_int?: number | null = null;
  attribute_value_id?: number | null = null;
  attribute?: AttributeDTO | null = null;
}

export class ProductImageDTO {
  id: number = 0;
  product_id: number = 0;
  variant_id: number = 0;
  url?: string | null = null;
}

export class VariantAttributeDTO {
  id: number = 0;
  attribute_id: number = 0;
  variant_id: number = 0;
  value_int?: number | null = null;
  value_text?: string | null = null;
  value_decimal?: number | null = null;
  attribute_value_id?: number | null = null;
  attribute_value?: AttributeValueDTO | null = null;
  attribute?: AttributeDTO | null = null;
}

export class ProductVariantDTO {
  @IsNumber()
  id: number = 0;
  @IsNumber()
  product_id: number = 0;
  @IsString()
  sku: string = '';
  @IsString()
  name: string = '';
  @Type(() => Number)
  @IsNumber()
  price: number = 0;
  @IsNumber()
  status: number = 0;
  created_at?: Date | null = null;
  product?: ProductDTO | null = null;
  product_images?: ProductImageDTO[] | null = null;
  variant_attributes?: VariantAttributeDTO[] | null = null;
}

export class ProductDTO {
  id: number = 0;
  name: string = '';
  description: string = '';
  category_id: number = 0;
  brand_id: number = 0;
  slug: string = '';
  rating: number = 0;
  status: number = 0;
  created_at?: Date | null = null;
  category?: CategoryDTO | null = null;
  brand?: BrandDTO | null = null;
  product_attribute?: ProductAttributeDTO[] = [];
  product_variant?: ProductVariantDTO[] = [];
}

export class ProductAddAndUpdateStateDTO {
  @Type(() => Number)
  @IsNumber()
  id: number = 0;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsString()
  description: string = '';

  @Type(() => Number)
  @IsNumber()
  category_id: number = 0;

  @Type(() => Number)
  @IsNumber()
  brand_id: number = 0;

  @IsString()
  slug: string = '';

  @Type(() => Number)
  @IsNumber()
  rating: number = 0;

  @Type(() => Number)
  @IsNumber()
  status: number = 0;
}

export class SaveProductContentDTO {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty()
  @IsString()
  html: string = '';

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsString()
  locale?: string = 'vi';

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  change_note?: string | null = null;
}

export class SaveProductContentResultDTO {
  product_id: number = 0;
  locale: string = 'vi';
  product_content_id: number = 0;
  draft_version_id: number = 0;
  version_number: number = 1;
}

export class ProductVariantPaginatedDTO {
  data: ProductVariantDTO[] = [];
  count: number = 0;
  max: number = 0;
  min: number = 0;
}

export class FilterStateDTO {
  skip: number = 0;
  take: number = 10;
  sortBy: string = 'created_at';
  order: string = 'asc';
  category: string = '';
  attributes: Record<string, string[]> = {};
  categoryIds: number[] = [];
  brandIds: number[] = [];
  minPrice?: number | null = null;
  maxPrice?: number | null = null;
}

export class CartDTO {
  id: number = 0;
  user_id: number = 0;
  variant_id: number = 0;
  quantity: number = 0;
  unit_price?: number | null = null;
  variant?: ProductVariantDTO | null = null;
}

// Content Management DTOs
export class ContentBlockDTO {
  id: number = 0;
  version_id: number = 0;
  block_type: string = 'html';
  sort_order: number = 0;
  data: Record<string, any> = {};
}

export class ContentVersionDTO {
  id: number = 0;
  product_content_id: number = 0;
  version_number: number = 1;
  created_by?: number | null = null;
  created_at: Date = new Date();
  change_note?: string | null = null;
  content_blocks?: ContentBlockDTO[] = [];
  is_draft?: boolean = false;
  is_published?: boolean = false;
}

export class ContentVersionDetailDTO {
  id: number = 0;
  product_id: number = 0;
  locale: string = 'vi';
  version_number: number = 1;
  created_at: Date = new Date();
  change_note?: string | null = null;
  html: string = '';
  is_draft?: boolean = false;
  is_published?: boolean = false;
  draft_version_id?: number | null = null;
  published_version_id?: number | null = null;
}

export class ContentVersionsListDTO {
  product_id: number = 0;
  locale: string = 'vi';
  versions: ContentVersionDTO[] = [];
  draft_version?: ContentVersionDTO | null = null;
  published_version?: ContentVersionDTO | null = null;
}

export class PublishVersionDTO {
  version_id: number = 0;
  change_note?: string | null = null;
}

export class RestoreVersionDTO {
  version_id: number = 0;
}

export class CompareVersionsResultDTO {
  version1: ContentVersionDetailDTO = new ContentVersionDetailDTO();
  version2: ContentVersionDetailDTO = new ContentVersionDetailDTO();
  differences: {
    added: string[];
    removed: string[];
    modified: string[];
  } = { added: [], removed: [], modified: [] };
}
