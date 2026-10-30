import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BrandDTO {
  @IsOptional()
  @IsInt()
  @Min(0)
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsInt()
  status?: number;
}
