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
let CategoryAttributeRepository = class CategoryAttributeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const list = await this.prisma.category_attributes.findMany({
            include: { attributes: true },
        });
        return list.map((ca) => this.toEntity(ca));
    }
    async findById(id) {
        const ca = await this.prisma.category_attributes.findUnique({
            where: { id },
            include: { attributes: true },
        });
        if (!ca)
            return null;
        return this.toEntity(ca);
    }
    async create(entity) {
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
        }
        catch {
            return false;
        }
    }
    async update(entity) {
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
        }
        catch {
            return false;
        }
    }
    async delete(id) {
        try {
            const existing = await this.prisma.category_attributes.findUnique({
                where: { id },
            });
            if (!existing)
                return false;
            await this.prisma.category_attributes.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
    async getByCategory(categorySlug) {
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
                entity.attribute.attribute_values = ca.attributes.attribute_value.map((av) => ({
                    id: av.id,
                    attribute_id: av.attribute_id,
                    value: av.value ?? '',
                }));
            }
            return entity;
        });
    }
    toEntity(ca) {
        let attribute = null;
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
};
CategoryAttributeRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], CategoryAttributeRepository);
export { CategoryAttributeRepository };
//# sourceMappingURL=category-attribute.repository.js.map