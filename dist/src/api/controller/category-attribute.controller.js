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
exports.CategoryAttributeController = void 0;
const common_1 = require("@nestjs/common");
const category_attribute_service_1 = require("../../application/service/category-attribute.service");
const category_attribute_dto_1 = require("../dto/category-attribute.dto");
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
            throw new common_1.BadRequestException();
        return result;
    }
    async update(id, entity) {
        const result = await this.service.update(id, entity);
        if (!result.success)
            throw new common_1.NotFoundException({
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
exports.CategoryAttributeController = CategoryAttributeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_attribute_dto_1.CategoryAttributeDTO]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, category_attribute_dto_1.CategoryAttributeUpdateStateDTO]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], CategoryAttributeController.prototype, "createMultipleAttr", null);
exports.CategoryAttributeController = CategoryAttributeController = __decorate([
    (0, common_1.Controller)('api/categoryattribute'),
    __metadata("design:paramtypes", [category_attribute_service_1.CategoryAttributeService])
], CategoryAttributeController);
//# sourceMappingURL=category-attribute.controller.js.map