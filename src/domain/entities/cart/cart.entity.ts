import type { ProductVariantEntity } from '../products/product.entity.js';

export interface CartEntity {
  id: number;
  user_id: number;
  variant_id: number;
  quantity: number;
  unit_price?: number | null;
  variant?: ProductVariantEntity | null;
}
