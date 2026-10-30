import { PrismaService } from '../database/prisma.service.js';
import type { ProvinceEntity } from '../../domain/entities/province.entity.js';
import type { IProvinceRepository } from '../../domain/repositories/iprovince.repository.js';
export declare class ProvinceRepository implements IProvinceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ProvinceEntity[]>;
}
