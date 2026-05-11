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
import { ProductVariantRepository } from '../../infrastruture/repository/product-variant.repository.js';
let ProductVariantService = class ProductVariantService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async getPaginationData(st) {
        return this.repo.getPaginationData(st);
    }
    async findById(id) {
        return this.repo.findById(id);
    }
    async create(entity) {
        return this.repo
            .create(entity)
            .then((res) => res)
            .catch((er) => {
            console.error('Error creating product variant:', er);
            return false;
        });
    }
    async update(entity) {
        return this.repo.update(entity);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
    async findByProductId(productId) {
        return this.repo.findByProductId(productId);
    }
};
ProductVariantService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ProductVariantRepository])
], ProductVariantService);
export { ProductVariantService };
//# sourceMappingURL=product-variant.service.js.map