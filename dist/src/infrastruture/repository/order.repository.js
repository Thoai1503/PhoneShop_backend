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
let OrderRepository = class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const list = await this.prisma.orders.findMany({
            include: { users: true, user_addresses: true },
            orderBy: {
                created_at: 'desc',
            },
        });
        return list.map((item) => ({
            id: item.id,
            user_id: item.user_id,
            discount: Number(item.discount),
            total: Number(item.total),
            address_id: item.address_id ?? undefined,
            status: item.status,
            created_at: item.created_at,
            user: {
                id: item.users.id,
                name: item.users.full_name,
                email: item.users.email,
                phone: item.users.phone,
                status: item.users.status,
            },
        }));
    }
    async findById(id) {
        const item = await this.prisma.orders.findUnique({
            where: { id },
            include: { users: true, user_addresses: true },
        });
        if (!item)
            return null;
        return {
            id: item.id,
            user_id: item.user_id,
            discount: Number(item.discount),
            total: Number(item.total),
            address_id: item.address_id ?? undefined,
            status: item.status,
            created_at: item.created_at,
            user: {
                id: item.users.id,
                name: item.users.full_name,
                email: item.users.email,
                phone: item.users.phone,
                status: item.users.status,
            },
        };
    }
    async getByUserId(userId) {
        const list = await this.prisma.orders.findMany({
            where: { user_id: userId },
        });
        return list.map((item) => ({
            id: item.id,
            user_id: userId,
            discount: Number(item.discount),
            total: Number(item.total),
            address_id: item.address_id ?? undefined,
            status: item.status,
            created_at: item.created_at,
            user: null,
        }));
    }
};
OrderRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], OrderRepository);
export { OrderRepository };
//# sourceMappingURL=order.repository.js.map