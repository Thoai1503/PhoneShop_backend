import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AttributeValueDTO } from 'src/api/dto/attribute.dto';

@Injectable()
export class AttributeValueRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<AttributeValueDTO | null> {
    const entity = await this.prisma.attribute_value.findUnique({
      where: { id },
    });
    if (!entity) return null;
    return this.toDTO(entity);
  }

  async getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]> {
    const list = await this.prisma.attribute_value.findMany({
      where: { attribute_id: attributeId },
    });
    return list.map((av) => this.toDTO(av));
  }

  private toDTO(av: any): AttributeValueDTO {
    const dto = new AttributeValueDTO();
    dto.id = av.id;
    dto.attribute_id = av.attribute_id;
    dto.value = av.value?.trim() ?? '';
    return dto;
  }
}
