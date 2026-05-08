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
exports.AttributeValueRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const attribute_dto_1 = require("../../api/dto/attribute.dto");
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
        const dto = new attribute_dto_1.AttributeValueDTO();
        dto.id = av.id;
        dto.attribute_id = av.attribute_id;
        dto.value = av.value?.trim() ?? '';
        return dto;
    }
};
exports.AttributeValueRepository = AttributeValueRepository;
exports.AttributeValueRepository = AttributeValueRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttributeValueRepository);
//# sourceMappingURL=attribute-value.repository.js.map