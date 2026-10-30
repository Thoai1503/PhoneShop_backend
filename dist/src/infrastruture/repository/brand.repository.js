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
import { BaseRepository } from './base.repository.js';
let BrandRepository = class BrandRepository extends BaseRepository {
    prisma;
    constructor(prisma) {
        super(prisma);
        this.prisma = prisma;
    }
    async create(item) {
        const created = await this.prisma.brands.create({
            data: {
                name: item.name,
                slug: item.slug,
                status: item.status,
            },
        });
        return this.toEntity(created);
    }
    async findById(id) {
        const brand = await this.prisma.brands.findUnique({ where: { id } });
        return brand ? this.toEntity(brand) : null;
    }
    async findAll() {
        const brands = await this.prisma.brands.findMany();
        return brands.map((brand) => this.toEntity(brand));
    }
    async update(id, input) {
        const existing = await this.prisma.brands.findUnique({ where: { id } });
        if (!existing)
            return null;
        const updated = await this.prisma.brands.update({
            where: { id },
            data: input,
        });
        return this.toEntity(updated);
    }
    async delete(id) {
        const result = await this.prisma.brands.deleteMany({ where: { id } });
        return result.count > 0;
    }
    toEntity(brand) {
        return {
            id: brand.id,
            name: brand.name,
            slug: brand.slug,
            status: brand.status,
        };
    }
};
BrandRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], BrandRepository);
export { BrandRepository };
//# sourceMappingURL=brand.repository.js.map