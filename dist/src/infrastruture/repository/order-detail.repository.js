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
import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { OrderDetailDTO } from '../../api/dto/order-detail.dto.js';
let OrderDetailRepository = class OrderDetailRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByOrderId(orderId) {
        const list = await this.prisma.order_detail.findMany({
            where: {
                order_id: orderId,
            },
        });
        return list.map((item) => {
            const dto = new OrderDetailDTO();
            dto.id = item.id;
            dto.order_id = item.order_id;
            dto.variant_id = item.variant_id;
            dto.quantity = item.quantity;
            return dto;
        });
    }
};
OrderDetailRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], OrderDetailRepository);
export { OrderDetailRepository };
//# sourceMappingURL=order-detail.repository.js.map