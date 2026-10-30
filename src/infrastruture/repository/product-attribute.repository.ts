import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IProductAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { ProductAttributeEntity } from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductAttributeRepository implements IProductAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<ProductAttributeEntity | null> {
    const en = await this.prisma.product_attribute.findUnique({
      where: { id },
    });
    if (!en) return null;
    return {
      id: en.id,
      product_id: en.product_id,
      attribute_id: en.attribute_id,
      value_int: en.value_int,
      value_text: en.value_text,
      value_decimal:
        en.value_decimal === null ? null : Number(en.value_decimal),
      attribute_value_id: en.attribute_value_id,
    };
  }

  async update(id: number, entity: ProductAttributeEntity): Promise<boolean> {
    try {
      await this.prisma.product_attribute.update({
        where: { id },
        data: {
          value_int: entity.value_int ?? null,
          value_text: entity.value_text ?? null,
          value_decimal: entity.value_decimal ?? null,
          attribute_value_id: entity.attribute_value_id ?? null,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
