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
exports.VariantAttributeRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const product_dto_1 = require("../../api/dto/product.dto");
let VariantAttributeRepository = class VariantAttributeRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const list = await this.prisma.variant_attribute.findMany();
        return list.map((x) => this.toDTO(x));
    }
    async updateFromList(list) {
        try {
            await this.prisma.$transaction(list.map((x) => this.prisma.variant_attribute.update({
                where: { id: x.id },
                data: {
                    attribute_id: x.attribute_id,
                    variant_id: x.variant_id,
                    value_int: x.value_int ?? null,
                    value_text: x.value_text ?? null,
                    value_decimal: x.value_decimal ?? null,
                    attribute_value_id: x.attribute_value_id ?? null,
                },
            })));
            return true;
        }
        catch {
            return false;
        }
    }
    toDTO(x) {
        const dto = new product_dto_1.VariantAttributeDTO();
        dto.id = x.id;
        dto.attribute_id = x.attribute_id;
        dto.variant_id = x.variant_id;
        dto.value_decimal =
            x.value_decimal !== null ? Number(x.value_decimal) : null;
        dto.value_int = x.value_int;
        dto.value_text = x.value_text;
        return dto;
    }
};
exports.VariantAttributeRepository = VariantAttributeRepository;
exports.VariantAttributeRepository = VariantAttributeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VariantAttributeRepository);
//# sourceMappingURL=variant-attribute.repository.js.map