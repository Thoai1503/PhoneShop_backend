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
import { AttributeDTO, AttributeValueDTO, } from '../../api/dto/attribute.dto.js';
let AttributeRepository = class AttributeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const attrs = await this.prisma.attributes.findMany({
            include: { attribute_value: true },
        });
        return attrs.map((a) => this.toDTO(a));
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
            const dto = this.toDTO(a);
            dto.is_selected = a.category_attributes.length > 0 ? 1 : 0;
            return dto;
        });
    }
    toDTO(a) {
        const dto = new AttributeDTO();
        dto.id = a.id;
        dto.name = a.name;
        dto.slug = a.slug ?? '';
        dto.data_type = a.data_type;
        dto.unit = a.unit;
        dto.status = a.status;
        dto.is_selected = 0;
        dto.attribute_values = (a.attribute_value ?? []).map((av) => {
            const avDto = new AttributeValueDTO();
            avDto.id = av.id;
            avDto.attribute_id = av.attribute_id;
            avDto.value = av.value?.trim() ?? '';
            return avDto;
        });
        return dto;
    }
};
AttributeRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], AttributeRepository);
export { AttributeRepository };
//# sourceMappingURL=attribute.repository.js.map