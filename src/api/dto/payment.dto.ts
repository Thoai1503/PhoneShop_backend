import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class PaymentRequestDTO {
  @Type(() => Number)
  @IsNumber()
  user_id: number = 0;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  amount?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  address_id?: number;

  @IsOptional()
  @IsNumber()
  orderId?: number;

  @IsOptional()
  @IsString()
  orderInfo?: string;

  @IsOptional()
  @IsString()
  bankCode?: string;

  @IsOptional()
  @IsString()
  orderType?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  requestType?: string;

  @IsOptional()
  @IsString()
  extraData?: string;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
