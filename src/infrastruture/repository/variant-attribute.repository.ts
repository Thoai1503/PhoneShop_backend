import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { VariantAttributeDTO } from '../../api/dto/product.dto';

@Injectable()
export class VariantAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<VariantAttributeDTO[]> {
    const list = await this.prisma.variant_attribute.findMany();
    return list.map((x) => this.toDTO(x));
  }

  async updateFromList(list: VariantAttributeDTO[]): Promise<boolean> {
    try {
      await this.prisma.$transaction(
        list.map((x) =>
          this.prisma.variant_attribute.update({
            where: { id: x.id },
            data: {
              attribute_id: x.attribute_id,
              variant_id: x.variant_id,
              value_int: x.value_int ?? null,
              value_text: x.value_text ?? null,
              value_decimal: x.value_decimal ?? null,
              attribute_value_id: x.attribute_value_id ?? null,
            },
          }),
        ),
      );
      return true;
    } catch {
      return false;
    }
  }

  private toDTO(x: any): VariantAttributeDTO {
    const dto = new VariantAttributeDTO();
    dto.id = x.id;
    dto.attribute_id = x.attribute_id;
    dto.variant_id = x.variant_id;
    dto.value_decimal =
      x.value_decimal !== null ? Number(x.value_decimal) : null;
    dto.value_int = x.value_int;
    dto.value_text = x.value_text;
    return dto;
  }
}
