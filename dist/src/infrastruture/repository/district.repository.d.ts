import { PrismaService } from '../database/prisma.service.js';
import type { DistrictEntity } from '../../domain/entities/district.entity.js';
import type { IDistrictRepository } from '../../domain/repositories/idistrict.repository.js';
export declare class DistrictRepository implements IDistrictRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByProvinceId(provinceId: number): Promise<DistrictEntity[]>;
}
