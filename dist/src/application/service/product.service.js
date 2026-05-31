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
    async updateAndReturn(id, product) {
        return this.repo.updateAndReturn(id, product);
    }
    async saveHtmlContentByProductId(productId, html, locale = 'vi', changeNote) {
        return this.repo.saveHtmlContentByProductId(productId, html, locale, changeNote);
    }
    async getHtmlContentByProductId(productId) {
        return this.repo.getHtmlContentByProductId(productId);
    }
    async getPublishedHtmlContentByProductId(productId) {
        return this.repo.getPublishedHtmlContentByProductId(productId);
    }
    async getVersionsList(productId, locale = 'vi') {
        return this.repo.getVersionsList(productId, locale);
    }
    async getVersionDetail(productId, versionId, locale = 'vi') {
        return this.repo.getVersionDetail(productId, versionId, locale);
    }
    async publishVersion(productId, versionId, locale = 'vi') {
        return this.repo.publishVersion(productId, versionId, locale);
    }
    async restoreVersion(productId, versionId, locale = 'vi') {
        return this.repo.restoreVersion(productId, versionId, locale);
    }
    async deleteVersion(productId, versionId, locale = 'vi') {
        return this.repo.deleteVersion(productId, versionId, locale);
    }
    async compareVersions(productId, versionId1, versionId2, locale = 'vi') {
        return this.repo.compareVersions(productId, versionId1, versionId2, locale);
    }
};
ProductService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ProductRepository])
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map