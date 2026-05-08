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
exports.CategoryBrandRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const category_brand_dto_1 = require("../../api/dto/category-brand.dto");
const category_dto_1 = require("../../api/dto/category.dto");
const brand_dto_1 = require("../../api/dto/brand.dto");
let CategoryBrandRepository = class CategoryBrandRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByCategory(categorySlug) {
        const list = await this.prisma.category_brands.findMany({
            where: { categories: { slug: categorySlug } },
            include: { categories: true, brands: true },
        });
        return list.map((cb) => {
            const dto = new category_brand_dto_1.CategoryBrandDTO();
            dto.id = cb.id;
            dto.category_id = cb.category_id;
            dto.brand_id = cb.brand_id;
            const cat = new category_dto_1.CategoryDTO();
            cat.id = cb.category_id;
            cat.name = cb.categories.name?.trim() ?? '';
            cat.slug = cb.categories.slug?.trim() ?? '';
            dto.category = cat;
            const brand = new brand_dto_1.BrandDTO();
            brand.id = cb.brand_id;
            brand.name = cb.brands.name?.trim() ?? '';
            brand.slug = cb.brands.slug?.trim() ?? '';
            dto.brand = brand;
            return dto;
        });
    }
};
exports.CategoryBrandRepository = CategoryBrandRepository;
exports.CategoryBrandRepository = CategoryBrandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryBrandRepository);
//# sourceMappingURL=category-brand.repository.js.map