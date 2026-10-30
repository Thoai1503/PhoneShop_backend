import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryAttributeRepository } from '../../domain/repositories/icategory.repository.js';
import type {
  CategoryAttributeEntity,
  CategoryAttributeUpdateEntity,
} from '../../domain/entities/categories/category.entity.js';

@Injectable()
export class CategoryAttributeRepository implements ICategoryAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<CategoryAttributeEntity[]> {
    const list = await this.prisma.category_attributes.findMany({
      include: { attributes: true },
    });
    return list.map((ca) => this.toEntity(ca));
  }

  async findById(id: number): Promise<CategoryAttributeEntity | null> {
    const ca = await this.prisma.category_attributes.findUnique({
      where: { id },
      include: { attributes: true },
    });
    if (!ca) return null;
    return this.toEntity(ca);
  }

  async create(entity: CategoryAttributeEntity): Promise<boolean> {
    try {
      await this.prisma.category_attributes.create({
        data: {
          attribute_id: entity.attribute_id,
          category_id: entity.category_id,
          is_filterable: false,
          is_variant_level: false,
          is_required: false,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async update(entity: CategoryAttributeUpdateEntity): Promise<boolean> {
    try {
      await this.prisma.category_attributes.update({
        where: { id: entity.id },
        data: {
          category_id: entity.category_id,
          attribute_id: entity.attribute_id,
          is_filterable: entity.is_filterable,
          is_variant_level: entity.is_variant_level,
          is_required: entity.is_required,
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const existing = await this.prisma.category_attributes.findUnique({
        where: { id },
      });
      if (!existing) return false;
      await this.prisma.category_attributes.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getByCategory(
    categorySlug: string,
  ): Promise<CategoryAttributeEntity[]> {
    const list = await this.prisma.category_attributes.findMany({
      where: { categories: { slug: { equals: categorySlug } } },
      include: {
        categories: true,
        attributes: { include: { attribute_value: true } },
      },
    });
    return list.map((ca) => {
      const entity = this.toEntity(ca);
      entity.category = {
        id: ca.categories.id,
        name: ca.categories.name?.trim() ?? '',
        slug: ca.categories.slug?.trim() ?? '',
        path: '',
      };
      if (ca.attributes) {
        entity.attribute!.attribute_values = ca.attributes.attribute_value.map(
          (av) => ({
            id: av.id,
            attribute_id: av.attribute_id,
            value: av.value ?? '',
          }),
        );
      }
      return entity;
    });
  }

  private toEntity<
    T extends {
      id: number;
      category_id: number;
      attribute_id: number;
      is_filterable: boolean;
      is_variant_level: boolean;
      is_required: boolean;
      attributes?: {
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
      } | null;
    },
  >(ca: T): CategoryAttributeEntity {
    let attribute: CategoryAttributeEntity['attribute'] = null;
    if (ca.attributes) {
      attribute = {
        id: ca.attributes.id,
        name: ca.attributes.name?.trim() ?? '',
        slug: ca.attributes.slug?.trim() ?? '',
        data_type: ca.attributes.data_type,
        unit: ca.attributes.unit,
        status: ca.attributes.status,
        is_selected: 0,
        attribute_values: (ca.attributes.attribute_value ?? []).map((av) => ({
          id: av.id,
          attribute_id: av.attribute_id,
          value: av.value?.trim() ?? '',
        })),
      };
    }
    return {
      id: ca.id,
      category_id: ca.category_id,
      attribute_id: ca.attribute_id,
      is_filterable: ca.is_filterable,
      is_variant_level: ca.is_variant_level,
      is_required: ca.is_required,
      category: null,
      attribute,
    };
  }
}
