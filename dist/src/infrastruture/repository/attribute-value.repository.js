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
import { AttributeValueDTO } from '../../api/dto/attribute.dto.js';
let AttributeValueRepository = class AttributeValueRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const entity = await this.prisma.attribute_value.findUnique({
            where: { id },
        });
        if (!entity)
            return null;
        return this.toDTO(entity);
    }
    async getByAttributeId(attributeId) {
        const list = await this.prisma.attribute_value.findMany({
            where: { attribute_id: attributeId },
        });
        return list.map((av) => this.toDTO(av));
    }
    toDTO(av) {
        const dto = new AttributeValueDTO();
        dto.id = av.id;
        dto.attribute_id = av.attribute_id;
        dto.value = av.value?.trim() ?? '';
        return dto;
    }
};
AttributeValueRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], AttributeValueRepository);
export { AttributeValueRepository };
//# sourceMappingURL=attribute-value.repository.js.map