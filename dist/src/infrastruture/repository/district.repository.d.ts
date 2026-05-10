import { PrismaService } from '../database/prisma.service.js';
import { DistrictDTO } from '../../api/dto/district.dto.js';
export declare class DistrictRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByProvinceId(provinceId: number): Promise<DistrictDTO[]>;
}
