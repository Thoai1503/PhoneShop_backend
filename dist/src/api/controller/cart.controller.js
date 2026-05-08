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
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from '../../application/service/cart.service.js';
let CartController = class CartController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findByUserId(userId) {
        return this.service.findByUserId(userId);
    }
};
__decorate([
    Get('user/:userId'),
    __param(0, Param('userId', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findByUserId", null);
CartController = __decorate([
    Controller('api/cart'),
    __metadata("design:paramtypes", [CartService])
], CartController);
export { CartController };
//# sourceMappingURL=cart.controller.js.map