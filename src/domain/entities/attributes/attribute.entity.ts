export interface AttributeValueEntity {
  id: number;
  attribute_id: number;
  value: string;
}

export interface AttributeEntity {
  id: number;
  name: string;
  slug: string;
  data_type: string;
  unit: string;
  status: number;
  is_selected: number;
  attribute_values: AttributeValueEntity[];
}
