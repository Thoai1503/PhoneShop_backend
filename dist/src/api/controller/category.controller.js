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
import { Body, HttpStatus, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Req, Res, } from '@nestjs/common';
import { CategoryService } from '../../application/service/category.service.js';
import { CategoryDTO } from '../dto/category.dto.js';
import { respondError, respondSuccess, } from '../../common/http/response.util.js';
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    toSlug(value) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async getAll(req, res) {
        const list = await this.categoryService.getAll();
        return respondSuccess(req, res, 200, list);
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
    async create(req, body, res) {
        try {
            const { name, parent_id } = body;
            if (!name) {
                return respondError(req, res, HttpStatus.BAD_REQUEST, { success: false, message: 'Name is required' }, 'Name is required');
            }
            const cate = new CategoryDTO();
            cate.name = name;
            cate.parent_id = parent_id ?? null;
            cate.slug = this.toSlug(name);
            cate.path = '';
            cate.level = 0;
            const result = await this.categoryService.createCategory(cate);
            return respondSuccess(req, res, HttpStatus.CREATED, {
                success: true,
                data: result,
            }, { message: 'Category created', data: result });
        }
        catch (error) {
            console.error('Error creating category:', error);
            return respondError(req, res, HttpStatus.INTERNAL_SERVER_ERROR, {
                success: false,
                message: 'Internal Server Error',
                error: error?.message,
            }, 'Internal Server Error');
        }
    }
    async update(req, id, body, res) {
        const cate = new CategoryDTO();
        cate.name = body.name ?? '';
        cate.parent_id = body.parent_id ?? null;
        if (body.name) {
            cate.slug = this.toSlug(body.name);
        }
        else {
            cate.slug = undefined;
        }
        cate.path = undefined;
        cate.level = undefined;
        const result = await this.categoryService.updateCategory(id, cate);
        if (!result) {
            return respondError(req, res, HttpStatus.NOT_FOUND, {
                success: false,
                message: "Can't update or not found the result",
            }, "Can't update or not found the result");
        }
        return respondSuccess(req, res, HttpStatus.CREATED, {
            success: true,
            message: 'Update successfully!',
        }, { message: 'Update successfully!', data: result });
    }
    async delete(req, id, res) {
        const result = await this.categoryService.deleteCategory(id);
        return respondSuccess(req, res, 200, result, {
            message: result ? 'Deleted' : 'Not deleted',
            data: result,
        });
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    Post(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Body()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    Controller('api/category'),
    __metadata("design:paramtypes", [CategoryService])
], CategoryController);
export { CategoryController };
//# sourceMappingURL=category.controller.js.map