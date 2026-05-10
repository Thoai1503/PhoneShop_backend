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
import { DistrictDTO } from '../../api/dto/district.dto.js';
let DistrictRepository = class DistrictRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByProvinceId(provinceId) {
        const list = await this.prisma.districts.findMany({
            where: { province_id: provinceId },
        });
        return list.map((item) => {
            const dto = new DistrictDTO();
            dto.id = item.id;
            dto.name = item.name;
            dto.code = item.code;
            dto.province_id = item.province_id;
            dto.status = item.status;
            return dto;
        });
    }
};
DistrictRepository = __decorate([
    Injectable(),
    __param(0, Inject(PrismaService)),
    __metadata("design:paramtypes", [PrismaService])
], DistrictRepository);
export { DistrictRepository };
//# sourceMappingURL=district.repository.js.map