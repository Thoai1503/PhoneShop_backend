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
import { UserAddressRepository } from '../../infrastruture/repository/user-address.repository.js';
let UserAddressService = class UserAddressService {
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
    async update(id, item) {
        return this.repo.update(id, item);
    }
};
UserAddressService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserAddressRepository])
], UserAddressService);
export { UserAddressService };
//# sourceMappingURL=user-address.service.js.map