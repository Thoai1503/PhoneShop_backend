import { Injectable, Logger } from '@nestjs/common';
import { Prisma, category_attributes } from '@prisma/client';
import { PrismaService } from './prisma.service.js';

type TxClient = Prisma.TransactionClient;

@Injectable()
export class CatalogSaveChangesService {
  private readonly logger = new Logger(CatalogSaveChangesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async runInTransaction<T>(handler: (tx: TxClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction((tx) => handler(tx));
  }

  async prepareCategoryForWrite(
    category: { name: string; parent_id?: number | null },
    tx?: TxClient,
  ): Promise<{ slug: string; level: number; path: string }> {
    const db = tx ?? this.prisma;
    const slug = this.slugify(this.removeVietnameseDiacritics(category.name));
    const parentId = category.parent_id ?? null;

    if (parentId === null || parentId === 0) {
      return { slug, level: 0, path: `/${slug}` };
    }

    const parent = await db.categories.findUnique({
      where: { id: parentId },
      select: { level: true, path: true },
    });

    if (!parent) {
      return { slug, level: 0, path: `/${slug}` };
    }

    return {
      slug,
      level: parent.level + 1,
      path: `${parent.path}/${slug}`,
    };
  }

  prepareAttributeSlug(name: string): string {
    return this.slugify(this.removeVietnameseDiacritics(name));
  }

  prepareProductSlug(name: string): string {
    return this.slugify(this.removeVietnameseDiacritics(name));
  }

  prepareBrandSlug(name: string): string {
    return this.slugify(this.removeVietnameseDiacritics(name));
  }

  async afterProductVariantCreated(
    variantId: number,
    tx?: TxClient,
  ): Promise<void> {
    const db = tx ?? this.prisma;
    const variant = await db.product_variants.findUnique({
      where: { id: variantId },
      select: { id: true, product_id: true },
    });

    if (!variant) {
      this.logger.warn(`Variant ${variantId} not found after create.`);
      return;
    }

    const product = await db.products.findUnique({
      where: { id: variant.product_id },
      select: { category_id: true },
    });

    if (!product) {
      this.logger.warn(
        `Product ${variant.product_id} not found for variant ${variant.id}.`,
      );
      return;
    }

    const categoryAttrs = await db.category_attributes.findMany({
      where: { category_id: product.category_id, is_variant_level: true },
      select: { attribute_id: true },
    });

    if (categoryAttrs.length === 0) {
      return;
    }

    const attributeIds = categoryAttrs.map((x) => x.attribute_id);
    const existing = await db.variant_attribute.findMany({
      where: {
        variant_id: variant.id,
        attribute_id: { in: attributeIds },
      },
      select: { attribute_id: true },
    });

    const existingIds = new Set(existing.map((x) => x.attribute_id));
    const payload = attributeIds
      .filter((id) => !existingIds.has(id))
      .map((attribute_id) => ({ attribute_id, variant_id: variant.id }));

    if (payload.length > 0) {
      await db.variant_attribute.createMany({ data: payload });
    }
  }

  async deleteProductVariantCascade(
    variantId: number,
    tx?: TxClient,
  ): Promise<void> {
    const db = tx ?? this.prisma;
    await db.variant_attribute.deleteMany({ where: { variant_id: variantId } });
    await db.product_image.deleteMany({ where: { variant_id: variantId } });
    await db.product_variants.delete({ where: { id: variantId } });
  }

  async afterCategoryAttributeCreated(
    categoryAttributeId: number,
    tx?: TxClient,
  ): Promise<void> {
    const db = tx ?? this.prisma;
    const categoryAttribute = await db.category_attributes.findUnique({
      where: { id: categoryAttributeId },
    });

    if (!categoryAttribute) {
      this.logger.warn(
        `CategoryAttribute ${categoryAttributeId} not found after create.`,
      );
      return;
    }

    await this.syncCategoryAttributeInsert(categoryAttribute, db);
  }

  async onCategoryAttributeVariantLevelChanged(
    categoryAttributeId: number,
    oldIsVariantLevel: boolean,
    newIsVariantLevel: boolean,
    tx?: TxClient,
  ): Promise<void> {
    if (oldIsVariantLevel === newIsVariantLevel) {
      return;
    }

    const db = tx ?? this.prisma;
    const categoryAttribute = await db.category_attributes.findUnique({
      where: { id: categoryAttributeId },
      select: { attribute_id: true, category_id: true },
    });

    if (!categoryAttribute) {
      this.logger.warn(
        `CategoryAttribute ${categoryAttributeId} not found for update sync.`,
      );
      return;
    }

    const productIds = await this.getProductIdsByCategory(
      categoryAttribute.category_id,
      db,
    );

    if (oldIsVariantLevel && !newIsVariantLevel) {
      const variantIds = await this.getVariantIdsByProductIds(productIds, db);
      if (variantIds.length > 0) {
        await db.variant_attribute.deleteMany({
          where: {
            attribute_id: categoryAttribute.attribute_id,
            variant_id: { in: variantIds },
          },
        });
      }

      await this.createMissingProductAttributes(
        productIds,
        categoryAttribute.attribute_id,
        db,
      );
      return;
    }

    await db.product_attribute.deleteMany({
      where: {
        attribute_id: categoryAttribute.attribute_id,
        product_id: { in: productIds },
      },
    });

    const variantIds = await this.getVariantIdsByProductIds(productIds, db);
    await this.createMissingVariantAttributes(
      variantIds,
      categoryAttribute.attribute_id,
      db,
    );
  }

  async onCategoryAttributeDeleted(
    categoryAttribute: Pick<
      category_attributes,
      'attribute_id' | 'category_id' | 'is_variant_level'
    >,
    tx?: TxClient,
  ): Promise<void> {
    const db = tx ?? this.prisma;
    const productIds = await this.getProductIdsByCategory(
      categoryAttribute.category_id,
      db,
    );

    if (!categoryAttribute.is_variant_level) {
      await db.product_attribute.deleteMany({
        where: {
          attribute_id: categoryAttribute.attribute_id,
          product_id: { in: productIds },
        },
      });
      return;
    }

    const variantIds = await this.getVariantIdsByProductIds(productIds, db);
    await db.variant_attribute.deleteMany({
      where: {
        attribute_id: categoryAttribute.attribute_id,
        variant_id: { in: variantIds },
      },
    });
  }

  async onProductDeleted(productId: number, tx?: TxClient): Promise<void> {
    const db = tx ?? this.prisma;
    await db.product_attribute.deleteMany({ where: { product_id: productId } });
  }

  private async syncCategoryAttributeInsert(
    categoryAttribute: Pick<
      category_attributes,
      'attribute_id' | 'category_id' | 'is_variant_level'
    >,
    db: TxClient | PrismaService,
  ): Promise<void> {
    const productIds = await this.getProductIdsByCategory(
      categoryAttribute.category_id,
      db,
    );

    if (!categoryAttribute.is_variant_level) {
      await this.createMissingProductAttributes(
        productIds,
        categoryAttribute.attribute_id,
        db,
      );
      return;
    }

    const variantIds = await this.getVariantIdsByProductIds(productIds, db);
    await this.createMissingVariantAttributes(
      variantIds,
      categoryAttribute.attribute_id,
      db,
    );
  }

  private async getProductIdsByCategory(
    categoryId: number,
    db: TxClient | PrismaService,
  ): Promise<number[]> {
    const products = await db.products.findMany({
      where: { category_id: categoryId },
      select: { id: true },
    });

    return products.map((x) => x.id);
  }

  private async getVariantIdsByProductIds(
    productIds: number[],
    db: TxClient | PrismaService,
  ): Promise<number[]> {
    if (productIds.length === 0) {
      return [];
    }

    const variants = await db.product_variants.findMany({
      where: { product_id: { in: productIds } },
      select: { id: true },
    });

    return variants.map((x) => x.id);
  }

  private async createMissingProductAttributes(
    productIds: number[],
    attributeId: number,
    db: TxClient | PrismaService,
  ): Promise<void> {
    if (productIds.length === 0) {
      return;
    }

    const existing = await db.product_attribute.findMany({
      where: {
        attribute_id: attributeId,
        product_id: { in: productIds },
      },
      select: { product_id: true },
    });

    const existingProductIds = new Set(existing.map((x) => x.product_id));
    const payload = productIds
      .filter((id) => !existingProductIds.has(id))
      .map((product_id) => ({ product_id, attribute_id: attributeId }));

    if (payload.length > 0) {
      await db.product_attribute.createMany({ data: payload });
    }
  }

  private async createMissingVariantAttributes(
    variantIds: number[],
    attributeId: number,
    db: TxClient | PrismaService,
  ): Promise<void> {
    if (variantIds.length === 0) {
      return;
    }

    const existing = await db.variant_attribute.findMany({
      where: {
        attribute_id: attributeId,
        variant_id: { in: variantIds },
      },
      select: { variant_id: true },
    });

    const existingVariantIds = new Set(existing.map((x) => x.variant_id));
    const payload = variantIds
      .filter((id) => !existingVariantIds.has(id))
      .map((variant_id) => ({ variant_id, attribute_id: attributeId }));

    if (payload.length > 0) {
      await db.variant_attribute.createMany({ data: payload });
    }
  }

  private removeVietnameseDiacritics(input: string): string {
    return input
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  private slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
