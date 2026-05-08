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
import { Body, Controller, Get, Post } from '@nestjs/common';
import { VariantAttributeService } from '../../application/service/variant-attribute.service.js';
let VariantAttributeController = class VariantAttributeController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAll() {
        return this.service.getAll();
    }
    async updateFromList(list) {
        return this.service.updateFromList(list);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VariantAttributeController.prototype, "getAll", null);
__decorate([
    Post('updatelist'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VariantAttributeController.prototype, "updateFromList", null);
VariantAttributeController = __decorate([
    Controller('api/variantattribute'),
    __metadata("design:paramtypes", [VariantAttributeService])
], VariantAttributeController);
export { VariantAttributeController };
//# sourceMappingURL=variant-attribute.controller.js.map