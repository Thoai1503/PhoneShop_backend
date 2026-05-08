import { IsNotEmpty } from 'class-validator';

export class AttributeValueDTO {
  id: number = 0;
  attribute_id: number = 0;
  value: string = '';
}

export class AttributeDTO {
  id: number = 0;
  @IsNotEmpty()
  name: string = '';
  slug: string = '';
  data_type: string = '';
  unit: string = '';
  status: number = 1;
  is_selected: number = 0;
  attribute_values: AttributeValueDTO[] = [];
}
