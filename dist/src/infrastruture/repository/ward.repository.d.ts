import { PrismaService } from '../database/prisma.service.js';
import { WardDTO } from '../../api/dto/ward.dto.js';
export declare class WardRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByDistrictId(districtId: number): Promise<WardDTO[]>;
}
