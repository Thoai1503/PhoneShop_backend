"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const product_dto_1 = require("../../api/dto/product.dto");
const attribute_dto_1 = require("../../api/dto/attribute.dto");
const category_dto_1 = require("../../api/dto/category.dto");
const brand_dto_1 = require("../../api/dto/brand.dto");
let ProductVariantRepository = class ProductVariantRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(entity) {
        try {
            await this.prisma.product_variants.create({
                data: {
                    product_id: entity.product_id,
                    name: entity.name,
                    SKU: entity.sku,
                    price: entity.price,
                    status: entity.status,
                    created_at: new Date(),
                },
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async delete(id) {
        try {
            const existing = await this.prisma.product_variants.findUnique({ where: { id } });
            if (!existing)
                return false;
            await this.prisma.product_variants.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
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
        return this.toDTO(x);
    }
    async update(entity) {
        try {
            const existing = await this.prisma.product_variants.findUnique({ where: { id: entity.id } });
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
        return list.map((e) => this.toDTO(e));
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
            list = list.filter((e) => e.products.categories.slug.toLowerCase().trim() === st.category.trim().toLowerCase());
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
                list.sort((a, b) => asc ? a.price - b.price : b.price - a.price);
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
                    (va.value_text?.trim().toLowerCase() === value.trim().toLowerCase() ||
                        va.value_int?.toString() === value.trim() ||
                        va.value_decimal?.toString() === value.trim() ||
                        (va.attribute_value_id != null &&
                            va.attribute_value_id === parseInt(value.trim(), 10))));
                const matchProduct = variant.products.product_attribute.some((pa) => pa.attribute_id === attributeId &&
                    (pa.value_text?.trim().toLowerCase() === value.trim().toLowerCase() ||
                        pa.value_int?.toString() === value.trim() ||
                        pa.value_decimal?.toString() === value.trim() ||
                        (pa.attribute_value_id != null &&
                            pa.attribute_value_id === parseInt(value.trim(), 10))));
                return matchVariant || matchProduct;
            }));
        }
        const totalCount = list.length;
        const paginatedList = list.slice(st.skip, st.skip + st.take);
        const result = new product_dto_1.ProductVariantPaginatedDTO();
        result.count = totalCount;
        result.max = maxPriceInDb;
        result.min = 0;
        result.data = paginatedList.map((x) => this.toDTO(x));
        return result;
    }
    toDTO(x) {
        const dto = new product_dto_1.ProductVariantDTO();
        dto.id = x.id;
        dto.product_id = x.product_id;
        dto.name = x.name;
        dto.price = x.price;
        dto.sku = x.SKU;
        dto.status = x.status;
        dto.created_at = x.created_at;
        if (x.products) {
            const p = x.products;
            const productDto = new product_dto_1.ProductDTO();
            productDto.id = p.id;
            productDto.name = p.name;
            productDto.slug = p.slug;
            productDto.description = p.description;
            productDto.status = p.status;
            productDto.created_at = p.created_at;
            productDto.brand_id = p.brand_id ?? 0;
            productDto.category_id = p.category_id;
            if (p.categories) {
                const cat = new category_dto_1.CategoryDTO();
                cat.id = p.categories.id;
                cat.name = p.categories.name?.trim() ?? '';
                cat.slug = p.categories.slug?.toLowerCase().trim() ?? '';
                productDto.category = cat;
            }
            if (p.brands) {
                const brand = new brand_dto_1.BrandDTO();
                brand.id = p.brands.id;
                brand.name = p.brands.name;
                brand.slug = p.brands.slug;
                productDto.brand = brand;
            }
            if (p.product_variants) {
                productDto.product_variant = p.product_variants.map((v) => {
                    const vDto = new product_dto_1.ProductVariantDTO();
                    vDto.id = v.id;
                    vDto.product_id = v.product_id;
                    vDto.name = v.name;
                    vDto.price = v.price;
                    vDto.sku = v.SKU;
                    vDto.status = v.status;
                    vDto.created_at = v.created_at;
                    return vDto;
                });
            }
            if (p.product_attribute) {
                productDto.product_attribute = p.product_attribute.map((pa) => {
                    const paDto = new product_dto_1.ProductAttributeDTO();
                    paDto.id = pa.id;
                    paDto.product_id = pa.product_id;
                    paDto.attribute_id = pa.attribute_id;
                    paDto.value_decimal = pa.value_decimal !== null ? Number(pa.value_decimal) : null;
                    paDto.value_int = pa.value_int;
                    paDto.value_text = pa.value_text;
                    if (pa.attributes) {
                        const attr = new attribute_dto_1.AttributeDTO();
                        attr.id = pa.attributes.id;
                        attr.name = pa.attributes.name;
                        attr.slug = pa.attributes.slug ?? '';
                        attr.data_type = pa.attributes.data_type;
                        attr.unit = pa.attributes.unit;
                        attr.status = pa.attributes.status;
                        paDto.attribute = attr;
                    }
                    return paDto;
                });
            }
            dto.product = productDto;
        }
        if (x.product_image) {
            dto.product_images = x.product_image.map((img) => {
                const imgDto = new product_dto_1.ProductImageDTO();
                imgDto.id = img.id;
                imgDto.product_id = img.product_id;
                imgDto.variant_id = img.variant_id;
                imgDto.url = img.url;
                return imgDto;
            });
        }
        if (x.variant_attribute) {
            dto.variant_attributes = x.variant_attribute.map((va) => {
                const vaDto = new product_dto_1.VariantAttributeDTO();
                vaDto.id = va.id;
                vaDto.variant_id = va.variant_id;
                vaDto.attribute_id = va.attribute_id;
                vaDto.value_decimal = va.value_decimal !== null ? Number(va.value_decimal) : null;
                vaDto.value_int = va.value_int;
                vaDto.value_text = va.value_text;
                vaDto.attribute_value_id = va.attribute_value_id;
                if (va.attribute_value) {
                    const avDto = new attribute_dto_1.AttributeValueDTO();
                    avDto.id = va.attribute_value.id;
                    avDto.attribute_id = va.attribute_value.attribute_id;
                    avDto.value = va.attribute_value.value ?? '';
                    vaDto.attribute_value = avDto;
                }
                if (va.attributes) {
                    const attr = new attribute_dto_1.AttributeDTO();
                    attr.id = va.attributes.id;
                    attr.name = va.attributes.name;
                    attr.slug = va.attributes.slug ?? '';
                    attr.data_type = va.attributes.data_type;
                    attr.unit = va.attributes.unit;
                    attr.status = va.attributes.status;
                    vaDto.attribute = attr;
                }
                return vaDto;
            });
        }
        return dto;
    }
};
exports.ProductVariantRepository = ProductVariantRepository;
exports.ProductVariantRepository = ProductVariantRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductVariantRepository);
//# sourceMappingURL=product-variant.repository.js.map