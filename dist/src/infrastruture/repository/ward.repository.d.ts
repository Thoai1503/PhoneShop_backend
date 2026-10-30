import { PrismaService } from '../database/prisma.service.js';
import type { WardEntity } from '../../domain/entities/ward.entity.js';
import type { IWardRepository } from '../../domain/repositories/iward.repository.js';
export declare class WardRepository implements IWardRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByDistrictId(districtId: number): Promise<WardEntity[]>;
}
