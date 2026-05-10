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
import { CartRepository } from '../../infrastruture/repository/cart.repository.js';
let CartService = class CartService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(item) {
        return this.repo.create(item);
    }
    async findByUserId(userId) {
        return this.repo.findByUserId(userId);
    }
    async updateQuantity(id, quantity) {
        return this.repo.updateQuantity(id, quantity);
    }
    async deleteById(id) {
        return this.repo.deleteById(id);
    }
    async deleteByUserId(userId) {
        return this.repo.deleteByUserId(userId);
    }
};
CartService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CartRepository])
], CartService);
export { CartService };
//# sourceMappingURL=cart.service.js.map