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
import { CategoryAttributeDTO } from '../../api/dto/category-attribute.dto.js';
import { AttributeDTO, AttributeValueDTO, } from '../../api/dto/attribute.dto.js';
import { CategoryDTO } from '../../api/dto/category.dto.js';
let CategoryAttributeRepository = class CategoryAttributeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const list = await this.prisma.category_attributes.findMany({
            include: { attributes: true },
        });
        return list.map((ca) => this.toDTO(ca));
    }
    async findById(id) {
        const ca = await this.prisma.category_attributes.findUnique({
            where: { id },
            include: { attributes: true },
        });
        if (!ca)
            return null;
        return this.toDTO(ca);
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
            const dto = this.toDTO(ca);
            dto.category = (() => {
                const c = new CategoryDTO();
                c.id = ca.categories.id;
                c.name = ca.categories.name?.trim() ?? '';
                c.slug = ca.categories.slug?.trim() ?? '';
                return c;
            })();
            if (ca.attributes) {
                dto.attribute.attribute_values = (ca.attributes.attribute_value ?? []).map((av) => {
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
    toDTO(ca) {
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
};
CategoryAttributeRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], CategoryAttributeRepository);
export { CategoryAttributeRepository };
//# sourceMappingURL=category-attribute.repository.js.map