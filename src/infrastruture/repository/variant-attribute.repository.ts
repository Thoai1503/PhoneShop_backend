import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IVariantAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { VariantAttributeEntity } from '../../domain/entities/products/product.entity.js';

@Injectable()
export class VariantAttributeRepository implements IVariantAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<VariantAttributeEntity[]> {
    const list = await this.prisma.variant_attribute.findMany();
    return list.map((x) => this.toEntity(x));
  }

  async updateFromList(list: VariantAttributeEntity[]): Promise<boolean> {
    try {
      await this.prisma.$transaction(
        list.map((x) =>
          this.prisma.variant_attribute.update({
            where: { id: x.id },
            data: {
              attribute_id: x.attribute_id,
              variant_id: x.variant_id,
              value_int: x.value_int !== null ? Number(x.value_int) : null,
              value_text: x.value_text ?? null,
              value_decimal: x.value_decimal ?? null,
              attribute_value_id: null,
            },
          }),
        ),
      );
      return true;
    } catch (error) {
      console.error('Error updating variant attributes:', error);
      return false;
    }
  }

  private toEntity(x: {
    id: number;
    attribute_id: number;
    variant_id: number;
    value_decimal: number | { toNumber(): number } | null;
    value_int: number | null;
    value_text: string | null;
    attribute_value_id?: number | null;
  }): VariantAttributeEntity {
    return {
      id: x.id,
      attribute_id: x.attribute_id,
      variant_id: x.variant_id,
      value_decimal:
        x.value_decimal !== null
          ? typeof x.value_decimal === 'number'
            ? x.value_decimal
            : x.value_decimal.toNumber()
          : null,
      value_int: x.value_int,
      value_text: x.value_text,
      attribute_value_id: x.attribute_value_id ?? null,
      attribute_value: null,
      attribute: null,
    };
  }
}
