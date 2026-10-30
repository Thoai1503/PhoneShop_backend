import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IAttributeRepository } from '../../domain/repositories/iattribute.repository.js';
import type {
  AttributeEntity,
  AttributeValueEntity,
} from '../../domain/entities/attributes/attribute.entity.js';

@Injectable()
export class AttributeRepository implements IAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<AttributeEntity[]> {
    const attrs = await this.prisma.attributes.findMany({
      include: { attribute_value: true },
    });
    return attrs.map((a) => this.toEntity(a));
  }

  async create(entity: AttributeEntity): Promise<boolean> {
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

  async getByCategoryId(categoryId: number): Promise<AttributeEntity[]> {
    const attrs = await this.prisma.attributes.findMany({
      include: {
        attribute_value: true,
        category_attributes: { where: { category_id: categoryId } },
      },
    });
    return attrs.map((a) => {
      return {
        ...this.toEntity(a),
        is_selected: a.category_attributes.length > 0 ? 1 : 0,
      };
    });
  }

  private toEntity<
    T extends {
      id: number;
      name: string;
      slug: string | null;
      data_type: string;
      unit: string;
      status: number;
      attribute_value?: Array<{
        id: number;
        attribute_id: number;
        value: string | null;
      }>;
    },
  >(a: T): AttributeEntity {
    const attributeValues: AttributeValueEntity[] = (
      a.attribute_value ?? []
    ).map((av) => ({
      id: av.id,
      attribute_id: av.attribute_id,
      value: av.value?.trim() ?? '',
    }));
    return {
      id: a.id,
      name: a.name,
      slug: a.slug ?? '',
      data_type: a.data_type,
      unit: a.unit,
      status: a.status,
      is_selected: 0,
      attribute_values: attributeValues,
    };
  }
}
