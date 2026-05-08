var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { CategoryAttributeRepository } from '../../infrastruture/repository/category-attribute.repository.js';
let CategoryAttributeService = class CategoryAttributeService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getAll() {
        return this.repo.getAll();
    }
    async findById(id) {
        return this.repo.findById(id);
    }
    async create(entity) {
        return this.repo.create(entity);
    }
    async update(id, updateState) {
        const entity = await this.repo.findById(id);
        if (!entity)
            return { success: false };
        entity.category_id = updateState.category_id;
        entity.attribute_id = updateState.attribute_id;
        entity.is_filterable = updateState.is_filterable;
        entity.is_variant_level = updateState.is_variant_level;
        entity.is_required = updateState.is_required;
        const result = await this.repo.update(entity);
        if (!result)
            return { success: false };
        return { success: true, entity };
    }
    async delete(id) {
        return this.repo.delete(id);
    }
    async getByCategory(categorySlug) {
        return this.repo.getByCategory(categorySlug);
    }
    async createMultiple(categoryId, attributeIds) {
        for (const attrId of attributeIds) {
            const result = await this.repo.create({
                attribute_id: attrId,
                category_id: categoryId,
                id: 0,
                is_filterable: false,
                is_variant_level: false,
                is_required: false,
            });
            if (!result)
                return { success: false, failedId: attrId };
        }
        return { success: true };
    }
};
CategoryAttributeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CategoryAttributeRepository])
], CategoryAttributeService);
export { CategoryAttributeService };
//# sourceMappingURL=category-attribute.service.js.map