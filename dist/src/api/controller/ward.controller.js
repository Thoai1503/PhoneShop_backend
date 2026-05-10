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
import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { WardService } from '../../application/service/ward.service.js';
import { respondSuccess } from '../../common/http/response.util.js';
let WardController = class WardController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getByDistrictId(req, districtId, res) {
        const list = await this.service.getByDistrictId(districtId);
        return respondSuccess(req, res, 200, list);
    }
};
__decorate([
    Get('district/:district_id'),
    __param(0, Req()),
    __param(1, Param('district_id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], WardController.prototype, "getByDistrictId", null);
WardController = __decorate([
    Controller('api/ward'),
    __metadata("design:paramtypes", [WardService])
], WardController);
export { WardController };
//# sourceMappingURL=ward.controller.js.map