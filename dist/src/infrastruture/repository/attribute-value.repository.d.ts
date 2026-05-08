import { PrismaService } from '../database/prisma.service.js';
import { AttributeValueDTO } from '../../api/dto/attribute.dto.js';
export declare class AttributeValueRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<AttributeValueDTO | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
    private toDTO;
}
