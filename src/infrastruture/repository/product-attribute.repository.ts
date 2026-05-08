import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductAttributeDTO } from '../../api/dto/product.dto';

@Injectable()
export class ProductAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<any | null> {
    const en = await this.prisma.product_attribute.findUnique({
      where: { id },
    });
    return en;
  }

  async update(id: number, entity: ProductAttributeDTO): Promise<boolean> {
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
