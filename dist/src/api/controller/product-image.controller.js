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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ProductImageService } from '../../application/service/product-image.service.js';
import { ProductImageDTO } from '../dto/product.dto.js';
let ProductImageController = class ProductImageController {
    service;
    constructor(service) {
        this.service = service;
    }
    async delete(id) {
        return this.service.delete(id);
    }
    async createByVariantId(_variantId, images, productId, variantId) {
        for (const file of images) {
            const entity = new ProductImageDTO();
            entity.product_id = parseInt(productId, 10);
            entity.variant_id = parseInt(variantId, 10);
            entity.url = file.filename;
            const result = await this.service.create(entity);
            if (!result)
                return false;
        }
        return true;
    }
    async getByVariantId(variantId) {
        return this.service.getByVariantId(variantId);
    }
};
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "delete", null);
__decorate([
    Post('variant/:variantId'),
    UseInterceptors(FilesInterceptor('images', 20, {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const uploadsFolder = join(process.cwd(), 'Uploads');
                if (!existsSync(uploadsFolder))
                    mkdirSync(uploadsFolder, { recursive: true });
                cb(null, uploadsFolder);
            },
            filename: (req, file, cb) => {
                const unique = `${uuidv4()}${extname(file.originalname)}`;
                cb(null, unique);
            },
        }),
    })),
    __param(0, Param('variantId', ParseIntPipe)),
    __param(1, UploadedFiles()),
    __param(2, Body('product_id')),
    __param(3, Body('variant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, String, String]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "createByVariantId", null);
__decorate([
    Get('variant/:variantId'),
    __param(0, Param('variantId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "getByVariantId", null);
ProductImageController = __decorate([
    Controller('api/productimage'),
    __metadata("design:paramtypes", [ProductImageService])
], ProductImageController);
export { ProductImageController };
//# sourceMappingURL=product-image.controller.js.map