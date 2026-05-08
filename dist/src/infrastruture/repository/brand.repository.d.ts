import { PrismaService } from '../database/prisma.service';
import { BrandDTO } from "../../api/dto/brand.dto";
export declare class BrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<BrandDTO[]>;
    private toDTO;
}
