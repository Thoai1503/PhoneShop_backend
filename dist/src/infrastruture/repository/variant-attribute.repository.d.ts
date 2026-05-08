import { PrismaService } from '../database/prisma.service';
import { VariantAttributeDTO } from "../../api/dto/product.dto";
export declare class VariantAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<VariantAttributeDTO[]>;
    updateFromList(list: VariantAttributeDTO[]): Promise<boolean>;
    private toDTO;
}
