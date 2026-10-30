import type {
  AttributeEntity,
  AttributeValueEntity,
} from '../attributes/attribute.entity.js';
import type {
  CategoryEntity,
} from '../categories/category.entity.js';

export interface ProductAttributeEntity {
  id: number;
  product_id: number;
  attribute_id: number;
  value_text?: string | null;
  value_decimal?: number | null;
  value_int?: number | null;
  attribute_value_id?: number | null;
  attribute?: AttributeEntity | null;
}

export interface ProductImageEntity {
  id: number;
  product_id: number;
  variant_id: number;
  url?: string | null;
}

export interface VariantAttributeEntity {
  id: number;
  attribute_id: number;
  variant_id: number;
  value_int?: number | null;
  value_text?: string | null;
  value_decimal?: number | null;
  attribute_value_id?: number | null;
  attribute_value?: AttributeValueEntity | null;
  attribute?: AttributeEntity | null;
}

export interface ProductVariantEntity {
  id: number;
  product_id: number;
  sku: string;
  name: string;
  price: number;
  status: number;
  created_at?: Date | null;
  product?: ProductEntity | null;
  product_images?: ProductImageEntity[] | null;
  variant_attributes?: VariantAttributeEntity[] | null;
}

export interface ProductEntity {
  id: number;
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  slug: string;
  rating: number;
  status: number;
  created_at?: Date | null;
  category?: CategoryEntity | null;
  brand?: {
    id?: number;
    name?: string;
    slug?: string;
  } | null;
  product_attribute?: ProductAttributeEntity[];
  product_variant?: ProductVariantEntity[];
}

export interface ProductCreateEntity {
  id: number;
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  slug: string;
  rating: number;
  status: number;
}

export interface ProductUpdateEntity {
  name?: string;
  description?: string;
  category_id?: number;
  brand_id?: number;
  slug?: string;
  rating?: number;
  status?: number;
}

export interface FilterStateEntity {
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

export interface ProductVariantPaginatedEntity {
  data: ProductVariantEntity[];
  count: number;
  max: number;
  min: number;
}

export interface ProductContentResultEntity {
  product_id: number;
  locale: string;
  product_content_id: number;
  draft_version_id: number;
  version_number: number;
  is_new_version_created: boolean;
  skip_reason?: string | null;
}

export interface ProductContentVersionsEntity {
  product_id: number;
  locale: string;
  versions: Array<{
    id: number;
    version_number: number;
    created_at: Date;
    change_note: string | null;
    is_draft: boolean;
    is_published: boolean;
  }>;
  draft_version_id: number | null;
  published_version_id: number | null;
}

export interface ProductContentVersionEntity {
  id: number;
  product_id: number;
  locale: string;
  version_number: number;
  created_at: Date;
  change_note: string | null;
  html: string;
  is_draft: boolean;
  is_published: boolean;
}

export interface ProductContentVersionStatusEntity {
  product_content_id: number;
  published_version_id: number;
  version_number: number;
}

export interface ProductContentRestoreEntity {
  product_content_id: number;
  draft_version_id: number;
  version_number: number;
}

export interface ProductContentComparisonEntity {
  version1: { version_number: number; html: string };
  version2: { version_number: number; html: string };
}
