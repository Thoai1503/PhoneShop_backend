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
import { BadRequestException, Body, Controller, Delete, Get, Header, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ProductService } from '../../application/service/product.service.js';
import { ProductAddAndUpdateStateDTO, ProductUpdateDTO, SaveProductContentDTO, } from '../dto/product.dto.js';
import { CloudinaryService } from '../../service/cloudinary.service.js';
import { AuthGuard } from '../../auth/auth.guard.js';
let ProductController = class ProductController {
    service;
    cloudinaryService;
    constructor(service, cloudinaryService) {
        this.service = service;
        this.cloudinaryService = cloudinaryService;
    }
    async getAll() {
        return this.service.getAll();
    }
    async getById(id) {
        const result = await this.service.findById(id);
        if (!result)
            throw new NotFoundException();
        return result;
    }
    async getProductHtmlContent(id) {
        const content = await this.service.getHtmlContentByProductId(id);
        if (!content) {
            throw new NotFoundException('Product content not found');
        }
        return { html: content };
    }
    async getPublishedProductHtmlContent(id) {
        const content = await this.service.getPublishedHtmlContentByProductId(id);
        if (!content) {
            throw new NotFoundException('Published product content not found');
        }
        return { html: content };
    }
    async getContentVersions(id) {
        const result = await this.service.getVersionsList(id);
        if (!result) {
            throw new NotFoundException('Product content not found');
        }
        return result;
    }
    async getContentVersionDetail(id, versionId) {
        const result = await this.service.getVersionDetail(id, versionId);
        if (!result) {
            throw new NotFoundException('Version not found');
        }
        return result;
    }
    async compareVersions(id, v1, v2) {
        const result = await this.service.compareVersions(id, v1, v2);
        if (!result) {
            throw new NotFoundException('Versions not found');
        }
        return result;
    }
    async create(product) {
        console.log('Received product for creation:', JSON.stringify(product));
        const result = await this.service.createAndReturn(product);
        if (!result)
            throw new InternalServerErrorException({
                message: 'Failed to create product',
            });
        return result;
    }
    async update(request, id, product) {
        if (!request.admin) {
            throw new BadRequestException('Only admin can update product');
        }
        const result = await this.service.updateAndReturn(id, product);
        if (!result) {
            throw new NotFoundException('Product not found');
        }
        return result;
    }
    async uploadContentImage(id, file) {
        const product = await this.service.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (!file) {
            throw new BadRequestException('File is required');
        }
        const url = await this.cloudinaryService.uploadProductContentImage(file, id);
        return { url };
    }
    async saveProductHtmlContent(id, payload) {
        const result = await this.service.saveHtmlContentByProductId(id, payload.html, payload.locale || 'vi', payload.change_note);
        if (!result) {
            throw new NotFoundException('Product not found');
        }
        return result;
    }
    async publishVersion(id, versionId) {
        const result = await this.service.publishVersion(id, versionId);
        if (!result) {
            throw new NotFoundException('Version not found');
        }
        return result;
    }
    async restoreVersion(id, versionId) {
        const result = await this.service.restoreVersion(id, versionId);
        if (!result) {
            throw new NotFoundException('Version not found');
        }
        return result;
    }
    async deleteVersion(id, versionId) {
        const result = await this.service.deleteVersion(id, versionId);
        if (!result) {
            throw new BadRequestException('Cannot delete draft or published versions');
        }
        return { success: true };
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getById", null);
__decorate([
    Get(':id/content'),
    Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'),
    Header('Pragma', 'no-cache'),
    Header('Expires', '0'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductHtmlContent", null);
__decorate([
    Get(':id/content/published'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getPublishedProductHtmlContent", null);
__decorate([
    Get(':id/content/versions'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getContentVersions", null);
__decorate([
    Get(':id/content/versions/:versionId'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('versionId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getContentVersionDetail", null);
__decorate([
    Get(':id/content/compare/:v1/:v2'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('v1', ParseIntPipe)),
    __param(2, Param('v2', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "compareVersions", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductAddAndUpdateStateDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    UseGuards(AuthGuard),
    Post(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, ProductUpdateDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    Post(':id/content/upload'),
    UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
    })),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadContentImage", null);
__decorate([
    Post(':id/content'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, SaveProductContentDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "saveProductHtmlContent", null);
__decorate([
    Post(':id/content/versions/:versionId/publish'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('versionId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "publishVersion", null);
__decorate([
    Post(':id/content/versions/:versionId/restore'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('versionId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "restoreVersion", null);
__decorate([
    Delete(':id/content/versions/:versionId'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Param('versionId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteVersion", null);
ProductController = __decorate([
    Controller('api/product'),
    __metadata("design:paramtypes", [ProductService,
        CloudinaryService])
], ProductController);
export { ProductController };
//# sourceMappingURL=product.controller.js.map