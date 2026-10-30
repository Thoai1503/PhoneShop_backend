import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { BaseRepository } from './base.repository.js';
import type { IAttributeValueRepository } from '../../domain/repositories/iattribute.repository.js';
import type { AttributeValueEntity } from '../../domain/entities/attributes/attribute.entity.js';

@Injectable()
export class AttributeValueRepository
  extends BaseRepository
  implements IAttributeValueRepository
{
  constructor(protected readonly prisma: PrismaService) {
    //  @Inject(PrismaService) private readonly prisma: PrismaService
    super(prisma);
  }

  async findById(id: number): Promise<AttributeValueEntity | null> {
    const entity = await this.prisma.attribute_value.findUnique({
      where: { id },
    });
    if (!entity) return null;
    return {
      id: entity.id,
      attribute_id: entity.attribute_id,
      value: entity.value?.trim() ?? '',
    };
  }

  async getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]> {
    const list = await this.prisma.attribute_value.findMany({
      where: { attribute_id: attributeId },
    });
    return list.map((av) => ({
      id: av.id,
      attribute_id: av.attribute_id,
      value: av.value?.trim() ?? '',
    }));
  }
}
