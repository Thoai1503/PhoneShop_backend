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
            return {
                id: cb.id,
                category_id: cb.category_id,
                brand_id: cb.brand_id,
                category: {
                    id: cb.category_id,
                    name: cb.categories.name?.trim() ?? '',
                    slug: cb.categories.slug?.trim() ?? '',
                    path: '',
                },
                brand: {
                    id: cb.brand_id,
                    name: cb.brands.name?.trim() ?? '',
                    slug: cb.brands.slug?.trim() ?? '',
                },
            };
        });
    }
};
CategoryBrandRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], CategoryBrandRepository);
export { CategoryBrandRepository };
//# sourceMappingURL=category-brand.repository.js.map