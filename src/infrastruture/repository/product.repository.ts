import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  ProductDTO,
  ProductAddAndUpdateStateDTO,
  ProductAttributeDTO,
  ProductVariantDTO,
  ProductImageDTO,
} from 'src/api/dto/product.dto';
import { BrandDTO } from 'src/api/dto/brand.dto';
import { CategoryDTO } from 'src/api/dto/category.dto';
import { AttributeDTO, AttributeValueDTO } from 'src/api/dto/attribute.dto';
import { CategoryAttributeDTO } from 'src/api/dto/category-attribute.dto';

@Injectable()
export class ProductRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<ProductDTO[]> {
    const list = await this.prisma.products.findMany({
      include: {
        brands: true,
        categories: true,
        product_variants: { include: { product_image: true } },
      },
    });
    return list.map((en) => {
      const dto = new ProductDTO();
      dto.id = en.id;
      dto.name = en.name;
      dto.description = en.description;
      dto.category_id = en.category_id;
      dto.brand_id = en.brand_id ?? 0;
      dto.rating = Number(en.rating);
      dto.status = en.status;

      const brand = new BrandDTO();
      brand.id = en.brands?.id ?? 0;
      brand.name = en.brands?.name ?? '';
      brand.slug = en.brands?.slug ?? '';
      dto.brand = brand;

      const cat = new CategoryDTO();
      cat.id = en.categories.id;
      cat.name = en.categories.name;
      cat.slug = en.categories.slug;
      cat.parent_id = en.categories.parent_id ?? 0;
      cat.path = en.categories.path ?? '';
      cat.level = en.categories.level ?? 0;
      dto.category = cat;

      dto.product_variant = en.product_variants.map((v) => {
        const vDto = new ProductVariantDTO();
        vDto.id = v.id;
        vDto.name = v.name;
        vDto.price = v.price;
        vDto.product_id = v.product_id;
        vDto.sku = v.SKU;
        vDto.product_images = v.product_image.map((img) => {
          const imgDto = new ProductImageDTO();
          imgDto.id = img.id;
          imgDto.product_id = img.product_id;
          imgDto.url = img.url;
          imgDto.variant_id = img.variant_id;
          return imgDto;
        });
        return vDto;
      });

      return dto;
    });
  }

  async findById(id: number): Promise<ProductDTO | null> {
    const en = await this.prisma.products.findUnique({
      where: { id },
      include: {
        brands: true,
        categories: {
          include: {
            category_attributes: {
              include: {
                attributes: { include: { attribute_value: true } },
              },
            },
          },
        },
        product_attribute: {
          include: { attributes: { include: { attribute_value: true } } },
        },
      },
    });
    if (!en) return null;

    const dto = new ProductDTO();
    dto.id = en.id;
    dto.name = en.name;
    dto.description = en.description;
    dto.category_id = en.category_id;
    dto.brand_id = en.brand_id ?? 0;
    dto.rating = Number(en.rating);
    dto.status = en.status;

    const brand = new BrandDTO();
    brand.id = en.brands?.id ?? 0;
    brand.name = en.brands?.name ?? '';
    brand.slug = en.brands?.slug ?? '';
    dto.brand = brand;

    const cat = new CategoryDTO();
    cat.id = en.categories.id;
    cat.name = en.categories.name;
    cat.slug = en.categories.slug;
    cat.parent_id = en.categories.parent_id ?? 0;
    cat.path = en.categories.path ?? '';
    cat.level = en.categories.level ?? 0;
    cat.category_attributes = en.categories.category_attributes.map((ca) => {
      const caDto = new CategoryAttributeDTO();
      caDto.id = ca.id;
      caDto.category_id = ca.category_id;
      caDto.attribute_id = ca.attribute_id;
      caDto.is_filterable = ca.is_filterable;
      caDto.is_variant_level = ca.is_variant_level;
      caDto.is_required = ca.is_required;
      const attr = new AttributeDTO();
      attr.id = ca.attributes.id;
      attr.name = ca.attributes.name;
      attr.slug = ca.attributes.slug ?? '';
      attr.data_type = ca.attributes.data_type;
      attr.unit = ca.attributes.unit;
      attr.status = ca.attributes.status;
      attr.attribute_values = ca.attributes.attribute_value.map((av) => {
        const avDto = new AttributeValueDTO();
        avDto.id = av.id;
        avDto.attribute_id = av.attribute_id;
        avDto.value = av.value;
        return avDto;
      });
      caDto.attribute = attr;
      return caDto;
    });
    dto.category = cat;

    dto.product_attribute = en.product_attribute.map((pa) => {
      const paDto = new ProductAttributeDTO();
      paDto.id = pa.id;
      paDto.product_id = pa.product_id;
      paDto.attribute_id = pa.attribute_id;
      paDto.value_text = pa.value_text;
      paDto.value_int = pa.value_int;
      paDto.value_decimal =
        pa.value_decimal !== null ? Number(pa.value_decimal) : null;
      paDto.attribute_value_id = pa.attribute_value_id;
      const attr = new AttributeDTO();
      attr.id = pa.attributes.id;
      attr.name = pa.attributes.name;
      attr.slug = pa.attributes.slug ?? '';
      attr.data_type = pa.attributes.data_type;
      attr.unit = pa.attributes.unit;
      attr.status = pa.attributes.status;
      attr.attribute_values = pa.attributes.attribute_value.map((av) => {
        const avDto = new AttributeValueDTO();
        avDto.id = av.id;
        avDto.attribute_id = av.attribute_id;
        avDto.value = av.value;
        return avDto;
      });
      paDto.attribute = attr;
      return paDto;
    });

    return dto;
  }

  async createAndReturn(
    product: ProductAddAndUpdateStateDTO,
  ): Promise<ProductDTO | null> {
    const en = await this.prisma.$transaction(async (tx) => {
      const created = await tx.products.create({
        data: {
          name: product.name,
          description: product.description,
          brand_id: product.brand_id,
          category_id: product.category_id,
          slug: product.slug,
          rating: product.rating,
          status: product.status,
          created_at: new Date(),
        },
      });

      // Create ProductAttributes for non-variant-level CategoryAttributes
      const categoryAttributes = await tx.category_attributes.findMany({
        where: { category_id: product.category_id, is_variant_level: false },
        select: { attribute_id: true },
      });

      const existingPairs = await tx.product_attribute.findMany({
        where: {
          product_id: created.id,
          attribute_id: { in: categoryAttributes.map((ca) => ca.attribute_id) },
        },
        select: { attribute_id: true },
      });
      const existingSet = new Set(existingPairs.map((e) => e.attribute_id));

      const toCreate = categoryAttributes
        .filter((ca) => !existingSet.has(ca.attribute_id))
        .map((ca) => ({
          product_id: created.id,
          attribute_id: ca.attribute_id,
        }));

      if (toCreate.length > 0) {
        await tx.product_attribute.createMany({ data: toCreate });
      }

      return created;
    });

    if (!en) return null;
    const dto = new ProductDTO();
    dto.id = en.id;
    dto.name = en.name;
    dto.slug = en.slug;
    dto.brand_id = en.brand_id ?? 0;
    dto.category_id = en.category_id;
    return dto;
  }
}
