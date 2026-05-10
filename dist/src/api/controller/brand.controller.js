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
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BrandService } from '../../application/service/brand.service.js';
import { BrandDTO } from '../dto/brand.dto.js';
import { respondSuccess } from '../../common/http/response.util.js';
let BrandController = class BrandController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createBrand(req, body, res) {
        try {
            const newBrand = new BrandDTO();
            newBrand.id = body.id ?? 0;
            newBrand.name = body.name ?? '';
            newBrand.slug = body.slug ?? '';
            newBrand.status = body.status ?? 1;
            const data = await this.service.create(newBrand);
            return respondSuccess(req, res, 200, data, { message: 'Brand created' });
        }
        catch (error) {
            throw error;
        }
    }
    async getAll(req, res) {
        const list = await this.service.getAll();
        return respondSuccess(req, res, 200, list);
    }
};
__decorate([
    Post(),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "createBrand", null);
__decorate([
    Get(),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "getAll", null);
BrandController = __decorate([
    Controller('api/brand'),
    __metadata("design:paramtypes", [BrandService])
], BrandController);
export { BrandController };
//# sourceMappingURL=brand.controller.js.map