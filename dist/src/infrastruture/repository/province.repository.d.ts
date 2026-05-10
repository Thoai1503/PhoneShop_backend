import { PrismaService } from '../database/prisma.service.js';
import { ProvinceDTO } from '../../api/dto/province.dto.js';
export declare class ProvinceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<ProvinceDTO[]>;
}
