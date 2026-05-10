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
import { CartDTO, ProductImageDTO, ProductVariantDTO, } from '../../api/dto/product.dto.js';
let CartRepository = class CartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(item) {
        const created = await this.prisma.cart.create({
            data: {
                user_id: item.user_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                unit_price: item.unit_price ?? null,
            },
        });
        return created.id;
    }
    async updateQuantity(id, quantity) {
        const updated = await this.prisma.cart.updateMany({
            where: { id },
            data: { quantity },
        });
        return updated.count > 0;
    }
    async deleteById(id) {
        const deleted = await this.prisma.cart.deleteMany({ where: { id } });
        return deleted.count > 0;
    }
    async deleteByUserId(userId) {
        await this.prisma.cart.deleteMany({
            where: { user_id: userId },
        });
        return true;
    }
    async findByUserId(userId) {
        const list = await this.prisma.cart.findMany({
            where: { user_id: userId },
            include: {
                product_variants: { include: { product_image: true } },
            },
        });
        return list.map((c) => {
            const dto = new CartDTO();
            dto.id = c.id;
            dto.user_id = c.user_id;
            dto.variant_id = c.variant_id;
            dto.quantity = c.quantity;
            dto.unit_price = Number(c.unit_price ?? 0);
            const vDto = new ProductVariantDTO();
            vDto.id = c.product_variants.id;
            vDto.name = c.product_variants.name;
            vDto.price = c.product_variants.price;
            vDto.product_images = c.product_variants.product_image.map((img) => {
                const imgDto = new ProductImageDTO();
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
CartRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], CartRepository);
export { CartRepository };
//# sourceMappingURL=cart.repository.js.map