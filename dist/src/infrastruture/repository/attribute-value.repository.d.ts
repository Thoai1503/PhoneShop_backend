import { PrismaService } from '../database/prisma.service.js';
import { AttributeValueDTO } from '../../api/dto/attribute.dto.js';
import { BaseRepository } from './base.repository.js';
export declare class AttributeValueRepository extends BaseRepository {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<AttributeValueDTO | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueDTO[]>;
    private toDTO;
}
