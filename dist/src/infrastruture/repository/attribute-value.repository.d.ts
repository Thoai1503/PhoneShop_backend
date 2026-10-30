import { PrismaService } from '../database/prisma.service.js';
import { BaseRepository } from './base.repository.js';
import type { IAttributeValueRepository } from '../../domain/repositories/iattribute.repository.js';
import type { AttributeValueEntity } from '../../domain/entities/attributes/attribute.entity.js';
export declare class AttributeValueRepository extends BaseRepository implements IAttributeValueRepository {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<AttributeValueEntity | null>;
    getByAttributeId(attributeId: number): Promise<AttributeValueEntity[]>;
}
