import { PrismaService } from '../database/prisma.service.js';
import { BrandDTO } from '../../api/dto/brand.dto.js';
export declare class BrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: BrandDTO): Promise<number>;
    getAll(): Promise<BrandDTO[]>;
    private toDTO;
}
