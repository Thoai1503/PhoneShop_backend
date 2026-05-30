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
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';
let MoMoPaymentController = class MoMoPaymentController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createPayment(req, body, res) {
        const url = await this.service.createMoMoPayment(body, req);
        return res.status(200).json({ success: true, url });
    }
};
__decorate([
    Post('create_payment'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PaymentRequestDTO, Object]),
    __metadata("design:returntype", Promise)
], MoMoPaymentController.prototype, "createPayment", null);
MoMoPaymentController = __decorate([
    Controller('api/v1/momo-payment'),
    __metadata("design:paramtypes", [PaymentService])
], MoMoPaymentController);
export { MoMoPaymentController };
//# sourceMappingURL=momo-payment.controller.js.map