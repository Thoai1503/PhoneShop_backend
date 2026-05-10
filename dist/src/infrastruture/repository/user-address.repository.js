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
let UserAddressRepository = class UserAddressRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(item) {
        if (item.is_default) {
            await this.prisma.user_addresses.updateMany({
                where: { user_id: item.user_id, is_default: true },
                data: { is_default: false },
            });
        }
        const result = await this.prisma.user_addresses.create({
            data: {
                user_id: item.user_id,
                full_name: item.full_name,
                phone: item.phone,
                province_id: Number(item.province_id),
                district_id: Number(item.district_id),
                ward_id: Number(item.ward_id),
                address_detail: item.address_detail,
                address_type: item.address_type,
                is_default: item.is_default,
            },
        });
        if (!result)
            return 0;
        return 1;
    }
    async update(id, item) {
        const current = await this.prisma.user_addresses.findUnique({
            where: { id },
        });
        if (!current) {
            throw new Error('Address not found');
        }
        if (item.is_default) {
            await this.prisma.user_addresses.updateMany({
                where: { user_id: item.user_id, is_default: true },
                data: { is_default: false },
            });
        }
        const result = await this.prisma.user_addresses.update({
            where: { id },
            data: {
                user_id: item.user_id,
                full_name: item.full_name,
                phone: item.phone,
                province_id: Number(item.province_id),
                district_id: Number(item.district_id),
                ward_id: Number(item.ward_id),
                address_detail: item.address_detail,
                address_type: item.address_type,
                is_default: item.is_default,
                updated_at: new Date(),
            },
        });
        return !!result;
    }
    async findByUserId(userId) {
        return this.prisma.user_addresses.findMany({
            where: {
                user_id: userId,
            },
            include: {
                users: true,
                provinces: true,
                districts: true,
                wards: true,
            },
        });
    }
};
UserAddressRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], UserAddressRepository);
export { UserAddressRepository };
//# sourceMappingURL=user-address.repository.js.map