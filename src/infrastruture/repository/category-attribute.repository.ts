import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CategoryAttributeDTO } from 'src/api/dto/category-attribute.dto';
import { AttributeDTO, AttributeValueDTO } from 'src/api/dto/attribute.dto';
import { CategoryDTO } from '../../api/dto/category.dto';

@Injectable()
export class CategoryAttributeRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<CategoryAttributeDTO[]> {
    const list = await this.prisma.category_attributes.findMany({
      include: { attributes: true },
    });
    return list.map((ca) => this.toDTO(ca));
  }

  async findById(id: number): Promise<CategoryAttributeDTO | null> {
    const ca = await this.prisma.category_attributes.findUnique({
      where: { id },
      include: { attributes: true },
    });
    if (!ca) return null;
    return this.toDTO(ca);
  }

  async create(entity: CategoryAttributeDTO): Promise<boolean> {
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

  async update(entity: CategoryAttributeDTO): Promise<boolean> {
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

  async getByCategory(categorySlug: string): Promise<CategoryAttributeDTO[]> {
    const list = await this.prisma.category_attributes.findMany({
      where: { categories: { slug: { equals: categorySlug } } },
      include: {
        categories: true,
        attributes: { include: { attribute_value: true } },
      },
    });
    return list.map((ca) => {
      const dto = this.toDTO(ca);
      dto.category = (() => {
        const c = new CategoryDTO();
        c.id = ca.categories.id;
        c.name = ca.categories.name?.trim() ?? '';
        c.slug = ca.categories.slug?.trim() ?? '';
        return c;
      })();
      if (ca.attributes) {
        dto.attribute!.attribute_values = (
          ca.attributes.attribute_value ?? []
        ).map((av: any) => {
          const avDto = new AttributeValueDTO();
          avDto.id = av.id;
          avDto.attribute_id = av.attribute_id;
          avDto.value = av.value ?? '';
          return avDto;
        });
      }
      return dto;
    });
  }

  private toDTO(ca: any): CategoryAttributeDTO {
    const dto = new CategoryAttributeDTO();
    dto.id = ca.id;
    dto.category_id = ca.category_id;
    dto.attribute_id = ca.attribute_id;
    dto.is_filterable = ca.is_filterable;
    dto.is_variant_level = ca.is_variant_level;
    dto.is_required = ca.is_required;
    if (ca.attributes) {
      const attr = new AttributeDTO();
      attr.id = ca.attributes.id;
      attr.name = ca.attributes.name?.trim() ?? '';
      attr.slug = ca.attributes.slug?.trim() ?? '';
      attr.data_type = ca.attributes.data_type;
      attr.unit = ca.attributes.unit;
      attr.status = ca.attributes.status;
      dto.attribute = attr;
    }
    return dto;
  }
}
