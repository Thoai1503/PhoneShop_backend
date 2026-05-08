import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AttributeDTO, AttributeValueDTO } from 'src/api/dto/attribute.dto';

@Injectable()
export class AttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<AttributeDTO[]> {
    const attrs = await this.prisma.attributes.findMany({
      include: { attribute_value: true },
    });
    return attrs.map((a) => this.toDTO(a));
  }

  async create(entity: AttributeDTO): Promise<boolean> {
    try {
      await this.prisma.attributes.create({
        data: {
          name: entity.name,
          slug: entity.slug,
          data_type: entity.data_type,
          unit: entity.unit,
          status: entity.status,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async getByCategoryId(categoryId: number): Promise<AttributeDTO[]> {
    const attrs = await this.prisma.attributes.findMany({
      include: {
        attribute_value: true,
        category_attributes: { where: { category_id: categoryId } },
      },
    });
    return attrs.map((a) => {
      const dto = this.toDTO(a);
      dto.is_selected = a.category_attributes.length > 0 ? 1 : 0;
      return dto;
    });
  }

  private toDTO(a: any): AttributeDTO {
    const dto = new AttributeDTO();
    dto.id = a.id;
    dto.name = a.name;
    dto.slug = a.slug ?? '';
    dto.data_type = a.data_type;
    dto.unit = a.unit;
    dto.status = a.status;
    dto.is_selected = 0;
    dto.attribute_values = (a.attribute_value ?? []).map((av: any) => {
      const avDto = new AttributeValueDTO();
      avDto.id = av.id;
      avDto.attribute_id = av.attribute_id;
      avDto.value = av.value?.trim() ?? '';
      return avDto;
    });
    return dto;
  }
}
