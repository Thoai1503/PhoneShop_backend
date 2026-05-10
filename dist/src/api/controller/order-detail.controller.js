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
import { OrderDetailService } from '../../application/service/order-detail.service.js';
import { respondSuccess } from '../../common/http/response.util.js';
let OrderDetailController = class OrderDetailController {
    service;
    constructor(service) {
        this.service = service;
    }
    async getAllOrder(req, orderId, res) {
        const list = await this.service.findByOrderId(orderId);
        return respondSuccess(req, res, 200, list);
    }
};
__decorate([
    Get('order/:order_id'),
    __param(0, Req()),
    __param(1, Param('order_id', ParseIntPipe)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], OrderDetailController.prototype, "getAllOrder", null);
OrderDetailController = __decorate([
    Controller('api/order-detail'),
    __metadata("design:paramtypes", [OrderDetailService])
], OrderDetailController);
export { OrderDetailController };
//# sourceMappingURL=order-detail.controller.js.map