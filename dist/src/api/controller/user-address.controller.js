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
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, Res, } from '@nestjs/common';
import { UserAddressService } from '../../application/service/user-address.service.js';
import { UserAddressDTO } from '../dto/user-address.dto.js';
import { respondSuccess } from '../../common/http/response.util.js';
let UserAddressController = class UserAddressController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createNewAddress(req, body, res) {
        const dto = new UserAddressDTO();
        dto.id = 0;
        dto.user_id = body.user_id;
        dto.full_name = body.full_name;
        dto.phone = body.phone;
        dto.province_id = body.province_id;
        dto.district_id = body.district_id;
        dto.ward_id = body.ward_id;
        dto.address_detail = body.address_detail;
        dto.address_type = 1;
        dto.is_default = body.is_default;
        dto.status = 1;
        const result = await this.service.create(dto);
        return respondSuccess(req, res, 201, result, {
            message: 'Address created',
            data: result,
        });
    }
    async findByUserId(req, userId, res) {
        const list = await this.service.findByUserId(userId);
        return respondSuccess(req, res, 200, list);
    }
    async updateAddress(req, id, body, res) {
        const dto = new UserAddressDTO();
        dto.id = body.id;
        dto.user_id = body.user_id;
        dto.full_name = body.full_name;
        dto.phone = body.phone;
        dto.province_id = body.province_id;
        dto.district_id = body.district_id;
        dto.ward_id = body.ward_id;
        dto.address_detail = body.address_detail;
        dto.address_type = 1;
        dto.is_default = body.is_default;
        dto.status = 1;
        const result = await this.service.update(id, dto);
        return respondSuccess(req, res, 200, result, {
            message: 'Address updated',
            data: result,
        });
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
], UserAddressController.prototype, "createNewAddress", null);
__decorate([
    Get('user/:user_id'),
    __param(0, Req()),
    __param(1, Param('user_id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UserAddressController.prototype, "findByUserId", null);
__decorate([
    Put(':id'),
    __param(0, Req()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Body()),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, UserAddressDTO, Object]),
    __metadata("design:returntype", Promise)
], UserAddressController.prototype, "updateAddress", null);
UserAddressController = __decorate([
    Controller('api/v1/useraddress'),
    __metadata("design:paramtypes", [UserAddressService])
], UserAddressController);
export { UserAddressController };
//# sourceMappingURL=user-address.controller.js.map