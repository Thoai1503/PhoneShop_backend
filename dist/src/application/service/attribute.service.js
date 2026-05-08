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
import { AttributeRepository } from '../../infrastruture/repository/attribute.repository.js';
let AttributeService = class AttributeService {
    attributeRepo;
    constructor(attributeRepo) {
        this.attributeRepo = attributeRepo;
    }
    async getAll() {
        return this.attributeRepo.getAll();
    }
    async create(entity) {
        return this.attributeRepo.create(entity);
    }
    async getByCategoryId(categoryId) {
        return this.attributeRepo.getByCategoryId(categoryId);
    }
};
AttributeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AttributeRepository])
], AttributeService);
export { AttributeService };
//# sourceMappingURL=attribute.service.js.map