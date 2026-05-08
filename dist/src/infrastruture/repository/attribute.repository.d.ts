import { PrismaService } from '../database/prisma.service';
import { AttributeDTO } from "../../api/dto/attribute.dto";
export declare class AttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<AttributeDTO[]>;
    create(entity: AttributeDTO): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeDTO[]>;
    private toDTO;
}
