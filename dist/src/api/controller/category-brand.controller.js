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
exports.CategoryBrandController = void 0;
const common_1 = require("@nestjs/common");
const category_brand_service_1 = require("../../application/service/category-brand.service");
let CategoryBrandController = class CategoryBrandController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getByCategory(category) {
        return this.service.getByCategory(category);
    }
};
exports.CategoryBrandController = CategoryBrandController;
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryBrandController.prototype, "getByCategory", null);
exports.CategoryBrandController = CategoryBrandController = __decorate([
    (0, common_1.Controller)('api/categorybrand'),
    __metadata("design:paramtypes", [category_brand_service_1.CategoryBrandService])
], CategoryBrandController);
//# sourceMappingURL=category-brand.controller.js.map