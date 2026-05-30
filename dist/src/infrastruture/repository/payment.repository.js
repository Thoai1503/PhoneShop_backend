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
let PaymentRepository = class PaymentRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCartItemsByUserId(userId) {
        return this.prisma.cart.findMany({
            where: { user_id: userId },
            select: {
                variant_id: true,
                quantity: true,
                unit_price: true,
            },
        });
    }
    async createOrderFromCart(payload) {
        return this.prisma.$transaction(async (tx) => {
            const cartItems = await tx.cart.findMany({
                where: { user_id: payload.userId },
                select: {
                    variant_id: true,
                    quantity: true,
                    unit_price: true,
                },
            });
            const order = await tx.orders.create({
                data: {
                    user_id: payload.userId,
                    discount: 0,
                    total: payload.amount,
                    address_id: payload.addressId ?? null,
                    status: 1,
                },
            });
            if (cartItems.length > 0) {
                await tx.order_detail.createMany({
                    data: cartItems.map((item) => ({
                        order_id: order.id,
                        variant_id: item.variant_id,
                        quantity: item.quantity,
                    })),
                });
            }
            await tx.cart.deleteMany({
                where: { user_id: payload.userId },
            });
            return {
                orderId: order.id,
                cartCount: cartItems.length,
            };
        });
    }
    async getPendingOrderByUserId(userId) {
        return this.prisma.orders.findFirst({
            where: {
                user_id: userId,
                status: 1,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
    }
    async updateOrderStatus(orderId, status) {
        const result = await this.prisma.orders.updateMany({
            where: { id: orderId },
            data: { status },
        });
        return result.count > 0;
    }
    async deleteCartByUserId(userId) {
        await this.prisma.cart.deleteMany({
            where: { user_id: userId },
        });
        return true;
    }
};
PaymentRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], PaymentRepository);
export { PaymentRepository };
//# sourceMappingURL=payment.repository.js.map