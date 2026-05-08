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
import { ProductImageDTO } from '../../api/dto/product.dto.js';
import * as path from 'path';
import * as fs from 'fs';
let ProductImageRepository = class ProductImageRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(entity) {
        try {
            await this.prisma.product_image.create({
                data: {
                    product_id: entity.product_id,
                    variant_id: entity.variant_id,
                    url: entity.url ?? '',
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
            const en = await this.prisma.product_image.findUnique({ where: { id } });
            if (!en)
                return false;
            const fileName = path.basename(en.url);
            const uploadsFolder = path.join(process.cwd(), 'Uploads');
            const filePath = path.join(uploadsFolder, fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            await this.prisma.product_image.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    }
    async getByVariantId(variantId) {
        const list = await this.prisma.product_image.findMany({
            where: { variant_id: variantId },
        });
        return list.map((e) => {
            const dto = new ProductImageDTO();
            dto.id = e.id;
            dto.product_id = e.product_id;
            dto.variant_id = variantId;
            dto.url = e.url;
            return dto;
        });
    }
};
ProductImageRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], ProductImageRepository);
export { ProductImageRepository };
//# sourceMappingURL=product-image.repository.js.map