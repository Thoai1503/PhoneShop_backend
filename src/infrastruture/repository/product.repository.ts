import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IProductRepository } from '../../domain/repositories/iproduct.repository.js';
import type {
  ProductContentComparisonEntity,
  ProductContentRestoreEntity,
  ProductContentResultEntity,
  ProductContentVersionEntity,
  ProductContentVersionsEntity,
  ProductContentVersionStatusEntity,
  ProductCreateEntity,
  ProductEntity,
  ProductUpdateEntity,
} from '../../domain/entities/products/product.entity.js';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<ProductEntity[]> {
    const list = await this.prisma.products.findMany({
      include: {
        brands: true,
        categories: true,
        product_variants: { include: { product_image: true } },
      },
    });
    return list.map((en) => ({
      id: en.id,
      name: en.name,
      description: en.description,
      category_id: en.category_id,
      brand_id: en.brand_id ?? 0,
      slug: '',
      rating: Number(en.rating),
      status: en.status,
      created_at: null,
      brand: {
        id: en.brands?.id ?? 0,
        name: en.brands?.name ?? '',
        slug: en.brands?.slug ?? '',
      },
      category: {
        id: en.categories.id,
        name: en.categories.name,
        slug: en.categories.slug,
        parent_id: en.categories.parent_id ?? 0,
        path: en.categories.path ?? '',
        level: en.categories.level ?? 0,
        category_attributes: [],
      },
      product_attribute: [],
      product_variant: en.product_variants.map((v) => ({
        id: v.id,
        name: v.name,
        price: v.price,
        product_id: v.product_id,
        sku: v.SKU,
        status: 0,
        created_at: null,
        product: null,
        product_images: v.product_image.map((img) => ({
          id: img.id,
          product_id: img.product_id,
          url: img.url,
          variant_id: img.variant_id,
        })),
        variant_attributes: null,
      })),
    }));
  }

  async findById(id: number): Promise<ProductEntity | null> {
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

    return {
      id: en.id,
      name: en.name,
      description: en.description,
      category_id: en.category_id,
      brand_id: en.brand_id ?? 0,
      slug: '',
      rating: Number(en.rating),
      status: en.status,
      created_at: null,
      brand: {
        id: en.brands?.id ?? 0,
        name: en.brands?.name ?? '',
        slug: en.brands?.slug ?? '',
      },
      category: {
        id: en.categories.id,
        name: en.categories.name,
        slug: en.categories.slug,
        parent_id: en.categories.parent_id ?? 0,
        path: en.categories.path ?? '',
        level: en.categories.level ?? 0,
        category_attributes: en.categories.category_attributes.map((ca) => ({
          id: ca.id,
          category_id: ca.category_id,
          attribute_id: ca.attribute_id,
          is_filterable: ca.is_filterable,
          is_variant_level: ca.is_variant_level,
          is_required: ca.is_required,
          category: null,
          attribute: {
            id: ca.attributes.id,
            name: ca.attributes.name,
            slug: ca.attributes.slug ?? '',
            data_type: ca.attributes.data_type,
            unit: ca.attributes.unit,
            status: ca.attributes.status,
            is_selected: 0,
            attribute_values: ca.attributes.attribute_value.map((av) => ({
              id: av.id,
              attribute_id: av.attribute_id,
              value: av.value,
            })),
          },
        })),
      },
      product_attribute: en.product_attribute.map((pa) => ({
        id: pa.id,
        product_id: pa.product_id,
        attribute_id: pa.attribute_id,
        value_text: pa.value_text,
        value_int: pa.value_int,
        value_decimal:
          pa.value_decimal !== null ? Number(pa.value_decimal) : null,
        attribute_value_id: pa.attribute_value_id,
        attribute: {
          id: pa.attributes.id,
          name: pa.attributes.name,
          slug: pa.attributes.slug ?? '',
          data_type: pa.attributes.data_type,
          unit: pa.attributes.unit,
          status: pa.attributes.status,
          is_selected: 0,
          attribute_values: pa.attributes.attribute_value.map((av) => ({
            id: av.id,
            attribute_id: av.attribute_id,
            value: av.value,
          })),
        },
      })),
      product_variant: [],
    };
  }

  async createAndReturn(
    product: ProductCreateEntity,
  ): Promise<ProductEntity | null> {
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
    return {
      id: en.id,
      name: en.name,
      slug: en.slug,
      brand_id: en.brand_id ?? 0,
      category_id: en.category_id,
      description: '',
      rating: 0,
      status: 0,
      created_at: null,
      category: null,
      brand: null,
      product_attribute: [],
      product_variant: [],
    };
  }

  async updateAndReturn(
    id: number,
    product: ProductUpdateEntity,
  ): Promise<ProductEntity | null> {
    const existing = await this.prisma.products.findUnique({ where: { id } });
    if (!existing) return null;

    const updated = await this.prisma.products.update({
      where: { id },
      data: {
        name: product.name ?? existing.name,
        description: product.description ?? existing.description,
        brand_id: product.brand_id ?? existing.brand_id,
        category_id: product.category_id ?? existing.category_id,
        slug: product.slug ?? existing.slug,
        rating: product.rating ?? Number(existing.rating),
        status: product.status ?? existing.status,
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      slug: updated.slug,
      brand_id: updated.brand_id ?? 0,
      category_id: updated.category_id,
      rating: Number(updated.rating),
      status: updated.status,
      created_at: updated.created_at,
      category: null,
      brand: null,
      product_attribute: [],
      product_variant: [],
    };
  }

  async saveHtmlContentByProductId(
    productId: number,
    html: string,
    locale = 'vi',
    changeNote?: string | null,
  ): Promise<ProductContentResultEntity | null> {
    const normalizedLocale = locale?.trim().toLowerCase() || 'vi';
    const normalizedHtml = (html ?? '').trim();

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.products.findUnique({
        where: { id: productId },
        select: { id: true },
      });

      if (!product) {
        return null;
      }

      const now = new Date();

      const content = await tx.product_content.upsert({
        where: {
          product_id_locale: {
            product_id: productId,
            locale: normalizedLocale,
          },
        },
        create: {
          product_id: productId,
          locale: normalizedLocale,
          updated_at: now,
        },
        update: {
          updated_at: now,
        },
      });

      if (content.published_version_id) {
        const publishedVersion = await tx.content_versions.findFirst({
          where: {
            id: content.published_version_id,
            product_content_id: content.id,
          },
          select: {
            id: true,
            version_number: true,
            content_blocks: {
              where: { block_type: 'html' },
              orderBy: { sort_order: 'asc' },
              take: 1,
              select: { data: true },
            },
          },
        });

        const publishedHtmlData = publishedVersion?.content_blocks?.[0]?.data;
        const publishedHtml =
          publishedHtmlData &&
          typeof publishedHtmlData === 'object' &&
          'html' in publishedHtmlData &&
          typeof publishedHtmlData.html === 'string'
            ? publishedHtmlData.html.trim()
            : '';

        if (publishedVersion && publishedHtml === normalizedHtml) {
          return {
            product_id: productId,
            locale: normalizedLocale,
            product_content_id: content.id,
            draft_version_id: content.draft_version_id ?? 0,
            version_number: publishedVersion.version_number,
            is_new_version_created: false,
            skip_reason: 'NO_CHANGES_FROM_PUBLISHED',
          };
        }
      }

      const latestVersion = await tx.content_versions.findFirst({
        where: { product_content_id: content.id },
        orderBy: { version_number: 'desc' },
        select: { version_number: true },
      });

      const nextVersionNumber = (latestVersion?.version_number ?? 0) + 1;

      const version = await tx.content_versions.create({
        data: {
          product_content_id: content.id,
          version_number: nextVersionNumber,
          change_note: changeNote || null,
          created_by: null,
          created_at: now,
        },
      });

      await tx.content_blocks.create({
        data: {
          version_id: version.id,
          block_type: 'html',
          sort_order: 0,
          data: { html: normalizedHtml },
        },
      });

      await tx.product_content.update({
        where: { id: content.id },
        data: {
          draft_version_id: version.id,
          updated_at: now,
        },
      });

      return {
        product_id: productId,
        locale: normalizedLocale,
        product_content_id: content.id,
        draft_version_id: version.id,
        version_number: nextVersionNumber,
        is_new_version_created: true,
        skip_reason: null,
      };
    });
  }

  async getHtmlContentByProductId(productId: number): Promise<string | null> {
    const locale = 'vi';

    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: {
        id: true,
        content_versions_product_content_draft_version_idTocontent_versions: {
          select: {
            content_blocks: {
              where: { block_type: 'html' },
              orderBy: { sort_order: 'asc' },
              take: 1,
              select: { data: true },
            },
          },
        },
      },
    });
    console.log(
      'Fetched product content for productId',
      productId,
      ':',
      productContent,
    );

    if (!productContent) {
      return null;
    }

    const draftHtmlBlock =
      productContent
        .content_versions_product_content_draft_version_idTocontent_versions
        ?.content_blocks?.[0]?.data;

    console.log(
      'Draft HTML block for productId',
      productId,
      ':',
      draftHtmlBlock,
    );

    if (
      draftHtmlBlock &&
      typeof draftHtmlBlock === 'object' &&
      'html' in draftHtmlBlock &&
      typeof draftHtmlBlock.html === 'string'
    ) {
      return draftHtmlBlock.html;
    }

    const latestVersion = await this.prisma.content_versions.findFirst({
      where: { product_content_id: productContent.id },
      orderBy: { version_number: 'desc' },
      select: {
        content_blocks: {
          where: { block_type: 'html' },
          orderBy: { sort_order: 'asc' },
          take: 1,
          select: { data: true },
        },
      },
    });

    const fallbackHtmlBlock = latestVersion?.content_blocks?.[0]?.data;

    if (
      fallbackHtmlBlock &&
      typeof fallbackHtmlBlock === 'object' &&
      'html' in fallbackHtmlBlock &&
      typeof fallbackHtmlBlock.html === 'string'
    ) {
      return fallbackHtmlBlock.html;
    }

    return null;
  }

  async getPublishedHtmlContentByProductId(
    productId: number,
  ): Promise<string | null> {
    const locale = 'vi';

    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: {
        id: true,
        published_version_id: true,
      },
    });

    if (!productContent?.published_version_id) {
      return null;
    }

    const publishedVersion = await this.prisma.content_versions.findFirst({
      where: {
        id: productContent.published_version_id,
        product_content_id: productContent.id,
      },
      select: {
        content_blocks: {
          where: { block_type: 'html' },
          orderBy: { sort_order: 'asc' },
          take: 1,
          select: { data: true },
        },
      },
    });

    const htmlBlock = publishedVersion?.content_blocks?.[0]?.data;
    if (
      htmlBlock &&
      typeof htmlBlock === 'object' &&
      'html' in htmlBlock &&
      typeof htmlBlock.html === 'string'
    ) {
      return htmlBlock.html;
    }

    return null;
  }

  async getVersionsList(
    productId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionsEntity | null> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: {
        id: true,
        draft_version_id: true,
        published_version_id: true,
        content_versions_content_versions_product_content_idToproduct_content: {
          select: {
            id: true,
            version_number: true,
            created_at: true,
            change_note: true,
          },
          orderBy: { version_number: 'desc' },
        },
      },
    });

    if (!productContent) {
      return null;
    }

    return {
      product_id: productId,
      locale,
      versions:
        productContent.content_versions_content_versions_product_content_idToproduct_content.map(
          (v) => ({
            id: v.id,
            version_number: v.version_number,
            created_at: v.created_at,
            change_note: v.change_note,
            is_draft: v.id === productContent.draft_version_id,
            is_published: v.id === productContent.published_version_id,
          }),
        ),
      draft_version_id: productContent.draft_version_id,
      published_version_id: productContent.published_version_id,
    };
  }

  async getVersionDetail(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionEntity | null> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: {
        id: true,
        draft_version_id: true,
        published_version_id: true,
      },
    });

    if (!productContent) {
      return null;
    }

    const version = await this.prisma.content_versions.findUnique({
      where: { id: versionId },
      select: {
        id: true,
        version_number: true,
        created_at: true,
        change_note: true,
        product_content_id: true,
        content_blocks: {
          where: { block_type: 'html' },
          take: 1,
          select: { data: true },
        },
      },
    });

    if (
      !version ||
      version.product_content_id !== productContent.id ||
      !version.content_blocks.length
    ) {
      return null;
    }

    const htmlData = version.content_blocks[0].data;
    const html =
      htmlData && typeof htmlData === 'object' && 'html' in htmlData
        ? (htmlData as { html: string }).html
        : '';

    return {
      id: version.id,
      product_id: productId,
      locale,
      version_number: version.version_number,
      created_at: version.created_at,
      change_note: version.change_note,
      html,
      is_draft: version.id === productContent.draft_version_id,
      is_published: version.id === productContent.published_version_id,
    };
  }

  async publishVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentVersionStatusEntity | null> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: { id: true },
    });

    if (!productContent) {
      return null;
    }

    const version = await this.prisma.content_versions.findUnique({
      where: { id: versionId },
      select: {
        id: true,
        version_number: true,
        product_content_id: true,
      },
    });

    if (!version || version.product_content_id !== productContent.id) {
      return null;
    }

    const updated = await this.prisma.product_content.update({
      where: { id: productContent.id },
      data: {
        published_version_id: version.id,
        published_at: new Date(),
      },
      select: {
        id: true,
        published_version_id: true,
      },
    });

    return {
      product_content_id: updated.id,
      published_version_id: updated.published_version_id ?? versionId,
      version_number: version.version_number,
    };
  }

  async restoreVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<ProductContentRestoreEntity | null> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: { id: true },
    });

    if (!productContent) {
      return null;
    }

    const versionToRestore = await this.prisma.content_versions.findUnique({
      where: { id: versionId },
      select: {
        id: true,
        version_number: true,
        product_content_id: true,
        content_blocks: {
          where: { block_type: 'html' },
          take: 1,
          select: { data: true },
        },
      },
    });

    if (
      !versionToRestore ||
      versionToRestore.product_content_id !== productContent.id
    ) {
      return null;
    }

    return this.prisma.$transaction(async (tx) => {
      const latestVersion = await tx.content_versions.findFirst({
        where: { product_content_id: productContent.id },
        orderBy: { version_number: 'desc' },
        select: { version_number: true },
      });

      const nextVersionNumber = (latestVersion?.version_number ?? 0) + 1;

      const newVersion = await tx.content_versions.create({
        data: {
          product_content_id: productContent.id,
          version_number: nextVersionNumber,
          change_note: `Restored from version ${versionToRestore.version_number}`,
          created_by: null,
          created_at: new Date(),
        },
      });

      if (versionToRestore.content_blocks.length > 0) {
        const htmlData = versionToRestore.content_blocks[0].data;
        await tx.content_blocks.create({
          data: {
            version_id: newVersion.id,
            block_type: 'html',
            sort_order: 0,
            data: htmlData || { html: '' },
          },
        });
      }

      await tx.product_content.update({
        where: { id: productContent.id },
        data: {
          draft_version_id: newVersion.id,
          updated_at: new Date(),
        },
      });

      return {
        product_content_id: productContent.id,
        draft_version_id: newVersion.id,
        version_number: nextVersionNumber,
      };
    });
  }

  async deleteVersion(
    productId: number,
    versionId: number,
    locale = 'vi',
  ): Promise<boolean> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: {
        id: true,
        draft_version_id: true,
        published_version_id: true,
      },
    });

    if (!productContent) {
      return false;
    }

    // Cannot delete draft or published versions
    if (
      versionId === productContent.draft_version_id ||
      versionId === productContent.published_version_id
    ) {
      return false;
    }

    await this.prisma.content_blocks.deleteMany({
      where: { version_id: versionId },
    });

    await this.prisma.content_versions.delete({
      where: { id: versionId },
    });

    return true;
  }

  async compareVersions(
    productId: number,
    versionId1: number,
    versionId2: number,
    locale = 'vi',
  ): Promise<ProductContentComparisonEntity | null> {
    const productContent = await this.prisma.product_content.findUnique({
      where: {
        product_id_locale: {
          product_id: productId,
          locale,
        },
      },
      select: { id: true },
    });

    if (!productContent) {
      return null;
    }

    const [version1, version2] = await Promise.all([
      this.prisma.content_versions.findUnique({
        where: { id: versionId1 },
        select: {
          version_number: true,
          product_content_id: true,
          content_blocks: {
            where: { block_type: 'html' },
            take: 1,
            select: { data: true },
          },
        },
      }),
      this.prisma.content_versions.findUnique({
        where: { id: versionId2 },
        select: {
          version_number: true,
          product_content_id: true,
          content_blocks: {
            where: { block_type: 'html' },
            take: 1,
            select: { data: true },
          },
        },
      }),
    ]);

    if (
      !version1 ||
      !version2 ||
      version1.product_content_id !== productContent.id ||
      version2.product_content_id !== productContent.id
    ) {
      return null;
    }

    const getHtml = (version: typeof version1) => {
      if (!version.content_blocks.length) return '';
      const data = version.content_blocks[0].data;
      return data && typeof data === 'object' && 'html' in data
        ? (data as { html: string }).html
        : '';
    };

    return {
      version1: {
        version_number: version1.version_number,
        html: getHtml(version1),
      },
      version2: {
        version_number: version2.version_number,
        html: getHtml(version2),
      },
    };
  }
}
