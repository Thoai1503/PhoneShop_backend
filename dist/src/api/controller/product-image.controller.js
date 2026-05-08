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
exports.ProductImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const product_image_service_1 = require("../../application/service/product-image.service");
const product_dto_1 = require("../dto/product.dto");
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
            const entity = new product_dto_1.ProductImageDTO();
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
exports.ProductImageController = ProductImageController;
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('variant/:variantId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadsFolder = (0, path_1.join)(process.cwd(), 'Uploads');
                if (!(0, fs_1.existsSync)(uploadsFolder))
                    (0, fs_1.mkdirSync)(uploadsFolder, { recursive: true });
                cb(null, uploadsFolder);
            },
            filename: (req, file, cb) => {
                const unique = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                cb(null, unique);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)('product_id')),
    __param(3, (0, common_1.Body)('variant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, String, String]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "createByVariantId", null);
__decorate([
    (0, common_1.Get)('variant/:variantId'),
    __param(0, (0, common_1.Param)('variantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductImageController.prototype, "getByVariantId", null);
exports.ProductImageController = ProductImageController = __decorate([
    (0, common_1.Controller)('api/productimage'),
    __metadata("design:paramtypes", [product_image_service_1.ProductImageService])
], ProductImageController);
//# sourceMappingURL=product-image.controller.js.map