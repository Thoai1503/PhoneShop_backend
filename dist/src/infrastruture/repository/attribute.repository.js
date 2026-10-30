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
let AttributeRepository = class AttributeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const attrs = await this.prisma.attributes.findMany({
            include: { attribute_value: true },
        });
        return attrs.map((a) => this.toEntity(a));
    }
    async create(entity) {
        try {
            await this.prisma.attributes.create({
                data: {
                    name: entity.name,
                    slug: entity.slug,
                    data_type: entity.data_type,
                    unit: entity.unit,
                    status: entity.status,
                },
            });
            return true;
        }
        catch {
            return false;
        }
    }
    async getByCategoryId(categoryId) {
        const attrs = await this.prisma.attributes.findMany({
            include: {
                attribute_value: true,
                category_attributes: { where: { category_id: categoryId } },
            },
        });
        return attrs.map((a) => {
            return {
                ...this.toEntity(a),
                is_selected: a.category_attributes.length > 0 ? 1 : 0,
            };
        });
    }
    toEntity(a) {
        const attributeValues = (a.attribute_value ?? []).map((av) => ({
            id: av.id,
            attribute_id: av.attribute_id,
            value: av.value?.trim() ?? '',
        }));
        return {
            id: a.id,
            name: a.name,
            slug: a.slug ?? '',
            data_type: a.data_type,
            unit: a.unit,
            status: a.status,
            is_selected: 0,
            attribute_values: attributeValues,
        };
    }
};
AttributeRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], AttributeRepository);
export { AttributeRepository };
//# sourceMappingURL=attribute.repository.js.map