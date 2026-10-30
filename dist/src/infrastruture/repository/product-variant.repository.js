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
import { CatalogSaveChangesService } from '../database/catalog-save-changes.service.js';
let ProductVariantRepository = class ProductVariantRepository {
    prisma;
    catalogSaveChangesService;
    constructor(prisma, catalogSaveChangesService) {
        this.prisma = prisma;
        this.catalogSaveChangesService = catalogSaveChangesService;
    }
    async create(entity) {
        const variant = await this.prisma.product_variants.create({
            data: {
                product_id: entity.product_id,
                name: entity.name,
                SKU: entity.sku,
                price: entity.price,
                status: 1,
                created_at: new Date(),
            },
        });
        await this.catalogSaveChangesService.afterProductVariantCreated(variant.id);
        return true;
    }
    async delete(id) {
        try {
            const existing = await this.prisma.product_variants.findUnique({
                where: { id },
            });
            if (!existing)
                return false;
            await this.prisma.product_variants.delete({ where: { id } });
            return true;
        }
        catch (er) {
            console.error('Error deleting product variant:', er);
            throw er;
        }
    }
    async findById(id) {
        const x = await this.prisma.product_variants.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        categories: true,
                        brands: true,
                        product_attribute: { include: { attributes: true } },
                        product_variants: true,
                    },
                },
                product_image: true,
                variant_attribute: {
                    include: {
                        attributes: true,
                        attribute_value: true,
                    },
                },
            },
        });
        if (!x)
            return null;
        return this.toEntity(x);
    }
    async update(entity) {
        try {
            const existing = await this.prisma.product_variants.findUnique({
                where: { id: entity.id },
            });
            if (!existing)
                return false;
            await this.prisma.product_variants.update({
                where: { id: entity.id },
                data: {
                    name: entity.name,
                    price: entity.price,
                    SKU: entity.sku,
                },
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async findByProductId(productId) {
        const list = await this.prisma.product_variants.findMany({
            where: { product_id: productId },
            include: {
                product_image: true,
                products: {
                    include: {
                        brands: true,
                        product_attribute: { include: { attributes: true } },
                    },
                },
                variant_attribute: {
                    include: {
                        attributes: true,
                        attribute_value: { include: { attributes: true } },
                    },
                },
            },
        });
        return list.map((e) => this.toEntity(e));
    }
    async getPaginationData(st) {
        const allVariants = await this.prisma.product_variants.findMany({
            include: {
                products: {
                    include: {
                        categories: true,
                        product_attribute: { include: { attributes: true } },
                    },
                },
                product_image: true,
                variant_attribute: {
                    include: {
                        attributes: true,
                        attribute_value: { include: { attributes: true } },
                    },
                },
            },
        });
        const maxPriceInDb = allVariants.length > 0 ? Math.max(...allVariants.map((v) => v.price)) : 0;
        let list = [...allVariants];
        if (st.category) {
            list = list.filter((e) => e.products.categories.slug.toLowerCase().trim() ===
                st.category.trim().toLowerCase());
        }
        if (st.minPrice != null) {
            list = list.filter((e) => e.price >= st.minPrice);
        }
        if (st.maxPrice != null) {
            list = list.filter((e) => e.price <= st.maxPrice);
        }
        if (st.categoryIds && st.categoryIds.length > 0) {
            list = list.filter((e) => st.categoryIds.includes(e.products.category_id));
        }
        if (st.sortBy && st.order) {
            const asc = st.order.toLowerCase() === 'asc';
            if (st.sortBy.toLowerCase() === 'price') {
                list.sort((a, b) => (asc ? a.price - b.price : b.price - a.price));
            }
            else {
                list.sort((a, b) => {
                    const da = new Date(a.created_at).getTime();
                    const db = new Date(b.created_at).getTime();
                    return asc ? da - db : db - da;
                });
            }
        }
        const attrs = { ...st.attributes };
        if (attrs['0']) {
            const brandValues = attrs['0'];
            list = list.filter((v) => brandValues.some((bv) => {
                const parsed = parseInt(bv.trim(), 10);
                return !isNaN(parsed) && v.products.brand_id === parsed;
            }));
            delete attrs['0'];
        }
        for (const [key, values] of Object.entries(attrs)) {
            const attributeId = parseInt(key, 10);
            if (isNaN(attributeId))
                continue;
            list = list.filter((variant) => values.some((value) => {
                const matchVariant = variant.variant_attribute.some((va) => va.attribute_id === attributeId &&
                    (va.value_text?.trim().toLowerCase() ===
                        value.trim().toLowerCase() ||
                        va.value_int?.toString() === value.trim() ||
                        va.value_decimal?.toString() === value.trim() ||
                        (va.attribute_value_id != null &&
                            va.attribute_value_id === parseInt(value.trim(), 10))));
                const matchProduct = variant.products.product_attribute.some((pa) => pa.attribute_id === attributeId &&
                    (pa.value_text?.trim().toLowerCase() ===
                        value.trim().toLowerCase() ||
                        pa.value_int?.toString() === value.trim() ||
                        pa.value_decimal?.toString() === value.trim() ||
                        (pa.attribute_value_id != null &&
                            pa.attribute_value_id === parseInt(value.trim(), 10))));
                return matchVariant || matchProduct;
            }));
        }
        const totalCount = list.length;
        const paginatedList = list.slice(st.skip, st.skip + st.take);
        return {
            count: totalCount,
            max: maxPriceInDb,
            min: 0,
            data: paginatedList.map((x) => this.toEntity(x)),
        };
    }
    toEntity(x) {
        const entity = {
            id: x.id,
            product_id: x.product_id,
            name: x.name,
            price: x.price,
            sku: x.SKU,
            status: x.status,
            created_at: x.created_at,
            product: null,
            product_images: null,
            variant_attributes: null,
        };
        if (x.products) {
            const p = x.products;
            const product = {
                id: p.id,
                name: p.name,
                slug: p.slug,
                description: p.description,
                status: p.status,
                created_at: p.created_at,
                brand_id: p.brand_id ?? 0,
                category_id: p.category_id,
                rating: 0,
                brand: 'brands' in p && p.brands
                    ? {
                        id: p.brands.id,
                        name: p.brands.name,
                        slug: p.brands.slug,
                    }
                    : null,
                category: 'categories' in p && p.categories
                    ? {
                        id: p.categories.id,
                        name: p.categories.name?.trim() ?? '',
                        slug: p.categories.slug?.toLowerCase().trim() ?? '',
                        path: '',
                        category_attributes: [],
                    }
                    : null,
                product_variant: 'product_variants' in p
                    ? p.product_variants.map((v) => ({
                        id: v.id,
                        product_id: v.product_id,
                        name: v.name,
                        price: v.price,
                        sku: v.SKU,
                        status: v.status,
                        created_at: v.created_at,
                        product: null,
                        product_images: null,
                        variant_attributes: null,
                    }))
                    : [],
                product_attribute: p.product_attribute.map((pa) => ({
                    id: pa.id,
                    product_id: pa.product_id,
                    attribute_id: pa.attribute_id,
                    value_decimal: pa.value_decimal === null ? null : Number(pa.value_decimal),
                    value_int: pa.value_int,
                    value_text: pa.value_text,
                    attribute_value_id: null,
                    attribute: pa.attributes
                        ? {
                            id: pa.attributes.id,
                            name: pa.attributes.name,
                            slug: pa.attributes.slug ?? '',
                            data_type: pa.attributes.data_type,
                            unit: pa.attributes.unit,
                            status: pa.attributes.status,
                            is_selected: 0,
                            attribute_values: [],
                        }
                        : null,
                })),
            };
            entity.product = product;
        }
        if (x.product_image) {
            entity.product_images = x.product_image.map((img) => ({
                id: img.id,
                product_id: img.product_id,
                variant_id: img.variant_id,
                url: img.url,
            }));
        }
        if (x.variant_attribute) {
            entity.variant_attributes = x.variant_attribute.map((va) => ({
                id: va.id,
                variant_id: va.variant_id,
                attribute_id: va.attribute_id,
                value_decimal: va.value_decimal === null ? null : Number(va.value_decimal),
                value_int: va.value_int,
                value_text: va.value_text,
                attribute_value_id: va.attribute_value_id,
                attribute_value: 'attribute_value' in va && va.attribute_value
                    ? {
                        id: va.attribute_value.id,
                        attribute_id: va.attribute_value.attribute_id,
                        value: va.attribute_value.value ?? '',
                    }
                    : null,
                attribute: va.attributes
                    ? {
                        id: va.attributes.id,
                        name: va.attributes.name,
                        slug: va.attributes.slug ?? '',
                        data_type: va.attributes.data_type,
                        unit: va.attributes.unit,
                        status: va.attributes.status,
                        is_selected: 0,
                        attribute_values: [],
                    }
                    : null,
            }));
        }
        return entity;
    }
};
ProductVariantRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __param(1, Inject()),
    __metadata("design:paramtypes", [PrismaService,
        CatalogSaveChangesService])
], ProductVariantRepository);
export { ProductVariantRepository };
//# sourceMappingURL=product-variant.repository.js.map