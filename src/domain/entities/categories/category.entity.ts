import type { AttributeEntity } from '../attributes/attribute.entity.js';

export interface CategoryEntity {
  id?: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  path: string;
  level?: number;
  created_at?: Date;
  category_attributes?: CategoryAttributeEntity[];
}

export interface CategorySummaryEntity {
  id?: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  path: string;
  level?: number;
  created_at?: Date;
}

export interface CategoryAttributeEntity {
  id: number;
  category_id: number;
  attribute_id: number;
  is_filterable: boolean;
  is_variant_level: boolean;
  is_required: boolean;
  category?: CategorySummaryEntity | null;
  attribute?: AttributeEntity | null;
}

export interface CategoryAttributeUpdateEntity {
  id: number;
  category_id: number;
  attribute_id: number;
  is_filterable: boolean;
  is_variant_level: boolean;
  is_required: boolean;
}

export interface CategoryBrandEntity {
  id: number;
  brand_id: number;
  category_id: number;
  category?: CategorySummaryEntity | null;
  brand?: {
    id?: number;
    name?: string;
    slug?: string;
  } | null;
}
