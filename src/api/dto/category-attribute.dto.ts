import { AttributeDTO } from './attribute.dto';
import { CategoryDTO } from './category.dto';

export class CategoryAttributeDTO {
  id: number = 0;
  category_id: number = 0;
  attribute_id: number = 0;
  is_filterable: boolean = false;
  is_variant_level: boolean = false;
  is_required: boolean = false;
  category?: CategoryDTO | null = null;
  attribute?: AttributeDTO | null = null;
}

export class CategoryAttributeUpdateStateDTO {
  id: number = 0;
  category_id: number = 0;
  attribute_id: number = 0;
  is_filterable: boolean = false;
  is_variant_level: boolean = false;
  is_required: boolean = false;
}
