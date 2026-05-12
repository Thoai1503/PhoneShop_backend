var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import UserDTO from '../../api/dto/user.dto.js';
let UsersRepository = class UsersRepository extends BaseRepository {
    prismaService;
    constructor(prismaService) {
        super(prismaService);
        this.prismaService = prismaService;
    }
    async findByEmail(email) {
        const user = await this.prismaService.users.findFirst({
            where: { email },
        });
        if (!user)
            return null;
        return new UserDTO({
            id: user?.id,
            email: user?.email,
            password: user?.password,
            role: user?.role,
            status: user?.status,
            phone: user?.phone,
            name: user?.full_name,
            is_verified: user?.is_verified,
        });
    }
    async createUser(user) {
        const created = await this.prismaService.users.create({
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                role: 2,
                status: user.getStatus(),
                phone: user.getPhone(),
                is_verified: user.getIsVerified(),
                full_name: user.getName(),
            },
        });
        return new UserDTO({
            id: created.id,
            email: created.email,
            password: created.password,
            role: created.role,
            status: created.status,
            phone: created.phone,
            name: created.full_name,
            is_verified: created.is_verified,
        });
    }
    async getUserById(id) {
        const user = await this.prismaService.users.findUnique({
            where: { id },
        });
        if (!user)
            return null;
        return new UserDTO({
            id: user?.id,
            email: user?.email,
            password: user?.password,
            role: user?.role,
            status: user?.status,
            phone: user?.phone,
            name: user?.full_name,
            is_verified: user?.is_verified,
        });
    }
    async markUserAsVerified(id) {
        await this.prismaService.users.update({
            where: { id },
            data: {
                is_verified: 1,
                status: 1,
            },
        });
    }
};
UsersRepository = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersRepository);
export { UsersRepository };
//# sourceMappingURL=user.repository.js.map