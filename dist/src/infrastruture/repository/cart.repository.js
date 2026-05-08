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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const product_dto_1 = require("../../api/dto/product.dto");
let CartRepository = class CartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        const list = await this.prisma.cart.findMany({
            where: { user_id: userId },
            include: {
                product_variants: { include: { product_image: true } },
            },
        });
        return list.map((c) => {
            const dto = new product_dto_1.CartDTO();
            dto.id = c.id;
            dto.user_id = c.user_id;
            dto.variant_id = c.variant_id;
            dto.quantity = c.quantity;
            const vDto = new product_dto_1.ProductVariantDTO();
            vDto.id = c.product_variants.id;
            vDto.name = c.product_variants.name;
            vDto.price = c.product_variants.price;
            vDto.product_images = c.product_variants.product_image.map((img) => {
                const imgDto = new product_dto_1.ProductImageDTO();
                imgDto.id = img.id;
                imgDto.product_id = img.product_id;
                imgDto.variant_id = img.variant_id;
                imgDto.url = img.url;
                return imgDto;
            });
            dto.variant = vDto;
            return dto;
        });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartRepository);
//# sourceMappingURL=cart.repository.js.map