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
import { Body, Controller, Delete, Get, NotFoundException, BadRequestException, Param, ParseIntPipe, Post, Put, } from '@nestjs/common';
import { CategoryAttributeService } from '../../application/service/category-attribute.service.js';
import { CategoryAttributeDTO, CategoryAttributeUpdateStateDTO, } from '../dto/category-attribute.dto.js';
let CategoryAttributeController = class CategoryAttributeController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return this.service.getAll();
    }
    async getByCategory(category) {
        return this.service.getByCategory(category);
    }
    async create(entity) {
        const result = await this.service.create(entity);
        if (!result)
            throw new BadRequestException();
        return result;
    }
    async update(id, entity) {
        const result = await this.service.update(id, entity);
        if (!result.success)
            throw new NotFoundException({
                success: false,
                message: 'Category attribute not found or update failed',
            });
        return result.entity;
    }
    async delete(id) {
        return this.service.delete(id);
    }
    async createMultipleAttr(categoryId, ints) {
        const result = await this.service.createMultiple(categoryId, ints);
        if (!result.success)
            return { success: false, id: result.failedId };
        return true;
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "getAll", null);
__decorate([
    Get('category/:category'),
    __param(0, Param('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "getByCategory", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryAttributeDTO]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "create", null);
__decorate([
    Put(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CategoryAttributeUpdateStateDTO]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "delete", null);
__decorate([
    Post('category/:categoryId'),
    __param(0, Param('categoryId', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "createMultipleAttr", null);
CategoryAttributeController = __decorate([
    Controller('api/categoryattribute'),
    __metadata("design:paramtypes", [CategoryAttributeService])
], CategoryAttributeController);
export { CategoryAttributeController };
//# sourceMappingURL=category-attribute.controller.js.map