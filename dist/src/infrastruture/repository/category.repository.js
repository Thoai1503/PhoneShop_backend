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
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("./base.repository");
const prisma_service_1 = require("../database/prisma.service");
const category_dto_1 = require("../../api/dto/category.dto");
let CategoryRepository = class CategoryRepository extends base_repository_1.BaseRepository {
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
        return this.toDTO(created);
    }
    async findById(id) {
        const category = await this.prismaService.categories.findUnique({
            where: { id },
        });
        if (!category)
            return null;
        return this.toDTO(category);
    }
    async findAll() {
        const categories = await this.prismaService.categories.findMany();
        return categories.map((c) => this.toDTO(c));
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
        return this.toDTO(updated);
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
    toDTO(c) {
        const dto = new category_dto_1.CategoryDTO();
        dto.id = c.id;
        dto.name = c.name;
        dto.slug = c.slug;
        dto.parent_id = c.parent_id ?? 0;
        dto.path = c.path ?? '';
        dto.level = c.level ?? 0;
        dto.created_at = c.created_at;
        return dto;
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(prisma_service_1.PrismaService)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map