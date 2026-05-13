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
import { ProductRepository } from '../../infrastruture/repository/product.repository.js';
let ProductService = class ProductService {
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
    async createAndReturn(product) {
        return this.repo.createAndReturn(product);
    }
    async saveHtmlContentByProductId(productId, html, locale = 'vi', changeNote) {
        return this.repo.saveHtmlContentByProductId(productId, html, locale, changeNote);
    }
    async getHtmlContentByProductId(productId) {
        return this.repo.getHtmlContentByProductId(productId);
    }
};
ProductService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ProductRepository])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map