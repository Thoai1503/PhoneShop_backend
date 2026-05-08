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
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, BadRequestException, } from '@nestjs/common';
import { CategoryService } from '../../application/service/category.service.js';
import { CategoryDTO } from '../dto/category.dto.js';
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getAll() {
        return this.categoryService.getAll();
    }
    getBySlug(slug) {
        return `Category with slug: ${slug}`;
    }
    async getById(id) {
        const result = await this.categoryService.findById(id);
        if (!result)
            throw new NotFoundException();
        return result;
    }
    async create(cate) {
        const result = await this.categoryService.createCategory(cate);
        if (!result)
            throw new BadRequestException();
        return result;
    }
    async update(id, cate) {
        const result = await this.categoryService.updateCategory(id, cate);
        if (!result)
            throw new NotFoundException();
        return result;
    }
    async delete(id) {
        const result = await this.categoryService.deleteCategory(id);
        if (!result)
            throw new NotFoundException();
        return result;
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    Get('slug/:slug'),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], CategoryController.prototype, "getBySlug", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    Post(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CategoryDTO]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    Controller('api/category'),
    __metadata("design:paramtypes", [CategoryService])
], CategoryController);
export { CategoryController };
//# sourceMappingURL=category.controller.js.map