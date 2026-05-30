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
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';
let VNPayPaymentController = class VNPayPaymentController {
    service;
    constructor(service) {
        this.service = service;
    }
    async vnpayReturn(req, res) {
        const result = await this.service.handleVNPayReturn(req.query);
        if (!result) {
            return res.status(400).json({ code: '97', message: 'Invalid signature' });
        }
        res.redirect(result.redirectUrl);
        return res;
    }
    async createPaymentTest(req, body, res) {
        const url = await this.service.createVNPayPayment(body, req);
        return res.status(200).json({ success: true, url });
    }
};
__decorate([
    Get('vnpay_return'),
    __param(0, Req()),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VNPayPaymentController.prototype, "vnpayReturn", null);
__decorate([
    Post('create_payment_test'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PaymentRequestDTO, Object]),
    __metadata("design:returntype", Promise)
], VNPayPaymentController.prototype, "createPaymentTest", null);
VNPayPaymentController = __decorate([
    Controller('api/v1/payment'),
    __metadata("design:paramtypes", [PaymentService])
], VNPayPaymentController);
export { VNPayPaymentController };
//# sourceMappingURL=vnpay-payment.controller.js.map