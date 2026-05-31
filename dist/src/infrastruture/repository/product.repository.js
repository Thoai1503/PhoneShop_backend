var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { ProductDTO, ProductAttributeDTO, ProductVariantDTO, ProductImageDTO, } from '../../api/dto/product.dto.js';
import { BrandDTO } from '../../api/dto/brand.dto.js';
import { CategoryDTO } from '../../api/dto/category.dto.js';
import { AttributeDTO, AttributeValueDTO, } from '../../api/dto/attribute.dto.js';
import { CategoryAttributeDTO } from '../../api/dto/category-attribute.dto.js';
let ProductRepository = class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
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
    async findById(id) {
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
        if (!en)
            return null;
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
    async createAndReturn(product) {
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
        if (!en)
            return null;
        const dto = new ProductDTO();
        dto.id = en.id;
        dto.name = en.name;
        dto.slug = en.slug;
        dto.brand_id = en.brand_id ?? 0;
        dto.category_id = en.category_id;
        return dto;
    }
    async updateAndReturn(id, product) {
        const existing = await this.prisma.products.findUnique({ where: { id } });
        if (!existing)
            return null;
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
        const dto = new ProductDTO();
        dto.id = updated.id;
        dto.name = updated.name;
        dto.description = updated.description;
        dto.slug = updated.slug;
        dto.brand_id = updated.brand_id ?? 0;
        dto.category_id = updated.category_id;
        dto.rating = Number(updated.rating);
        dto.status = updated.status;
        dto.created_at = updated.created_at;
        return dto;
    }
    async saveHtmlContentByProductId(productId, html, locale = 'vi', changeNote) {
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
                const publishedHtml = publishedHtmlData &&
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
    async getHtmlContentByProductId(productId) {
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
        console.log('Fetched product content for productId', productId, ':', productContent);
        if (!productContent) {
            return null;
        }
        const draftHtmlBlock = productContent
            .content_versions_product_content_draft_version_idTocontent_versions
            ?.content_blocks?.[0]?.data;
        console.log('Draft HTML block for productId', productId, ':', draftHtmlBlock);
        if (draftHtmlBlock &&
            typeof draftHtmlBlock === 'object' &&
            'html' in draftHtmlBlock &&
            typeof draftHtmlBlock.html === 'string') {
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
        if (fallbackHtmlBlock &&
            typeof fallbackHtmlBlock === 'object' &&
            'html' in fallbackHtmlBlock &&
            typeof fallbackHtmlBlock.html === 'string') {
            return fallbackHtmlBlock.html;
        }
        return null;
    }
    async getPublishedHtmlContentByProductId(productId) {
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
        if (htmlBlock &&
            typeof htmlBlock === 'object' &&
            'html' in htmlBlock &&
            typeof htmlBlock.html === 'string') {
            return htmlBlock.html;
        }
        return null;
    }
    async getVersionsList(productId, locale = 'vi') {
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
            versions: productContent.content_versions_content_versions_product_content_idToproduct_content.map((v) => ({
                id: v.id,
                version_number: v.version_number,
                created_at: v.created_at,
                change_note: v.change_note,
                is_draft: v.id === productContent.draft_version_id,
                is_published: v.id === productContent.published_version_id,
            })),
            draft_version_id: productContent.draft_version_id,
            published_version_id: productContent.published_version_id,
        };
    }
    async getVersionDetail(productId, versionId, locale = 'vi') {
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
        if (!version ||
            version.product_content_id !== productContent.id ||
            !version.content_blocks.length) {
            return null;
        }
        const htmlData = version.content_blocks[0].data;
        const html = htmlData && typeof htmlData === 'object' && 'html' in htmlData
            ? htmlData.html
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
    async publishVersion(productId, versionId, locale = 'vi') {
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
    async restoreVersion(productId, versionId, locale = 'vi') {
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
        if (!versionToRestore ||
            versionToRestore.product_content_id !== productContent.id) {
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
    async deleteVersion(productId, versionId, locale = 'vi') {
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
        if (versionId === productContent.draft_version_id ||
            versionId === productContent.published_version_id) {
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
    async compareVersions(productId, versionId1, versionId2, locale = 'vi') {
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
        if (!version1 ||
            !version2 ||
            version1.product_content_id !== productContent.id ||
            version2.product_content_id !== productContent.id) {
            return null;
        }
        const getHtml = (version) => {
            if (!version.content_blocks.length)
                return '';
            const data = version.content_blocks[0].data;
            return data && typeof data === 'object' && 'html' in data
                ? data.html
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
};
ProductRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], ProductRepository);
export { ProductRepository };
//# sourceMappingURL=product.repository.js.map