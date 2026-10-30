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
import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
let CategoryRepository = class CategoryRepository extends BaseRepository {
    prismaService;
    constructor(prismaService) {
        super(prismaService);
        this.prismaService = prismaService;
    }
    async create(item) {
        const created = await this.prismaService.categories.create({
            data: {
                name: item.name,
                slug: item.slug,
                parent_id: item.parent_id ?? null,
                path: item.path ?? null,
                level: item.level ?? 0,
                created_at: new Date(),
            },
        });
        return this.toEntity(created);
    }
    async findById(id) {
        const category = await this.prismaService.categories.findUnique({
            where: { id },
        });
        if (!category)
            return null;
        return this.toEntity(category);
    }
    async findAll() {
        const categories = await this.prismaService.categories.findMany();
        return categories.map((c) => this.toEntity(c));
    }
    async update(id, item) {
        const existing = await this.prismaService.categories.findUnique({
            where: { id },
        });
        if (!existing)
            return null;
        const updated = await this.prismaService.categories.update({
            where: { id },
            data: {
                name: item.name ?? existing.name,
                slug: item.slug ?? existing.slug,
                parent_id: item.parent_id ?? existing.parent_id,
                path: item.path ?? existing.path,
                level: item.level ?? existing.level,
            },
        });
        return this.toEntity(updated);
    }
    async deleteById(id) {
        const existing = await this.prismaService.categories.findUnique({
            where: { id },
        });
        if (!existing)
            return false;
        await this.prismaService.categories.delete({ where: { id } });
        return true;
    }
    toEntity(c) {
        return {
            id: c.id,
            name: c.name,
            slug: c.slug,
            parent_id: c.parent_id ?? 0,
            path: c.path ?? '',
            level: c.level ?? 0,
            created_at: c.created_at ?? undefined,
            category_attributes: [],
        };
    }
};
CategoryRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], CategoryRepository);
export { CategoryRepository };
//# sourceMappingURL=category.repository.js.map