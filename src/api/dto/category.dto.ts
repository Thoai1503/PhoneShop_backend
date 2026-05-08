import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string = '';

  @IsNotEmpty()
  @IsString()
  slug: string = '';

  @IsOptional()
  @IsNumber()
  parent_id?: number | null;

  @IsOptional()
  @IsString()
  path: string = '';

  @IsOptional()
  @IsNumber()
  level?: number;

  created_at?: Date;
  category_attributes?: any[];
}
