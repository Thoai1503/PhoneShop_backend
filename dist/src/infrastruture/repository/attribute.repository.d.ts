import { PrismaService } from '../database/prisma.service.js';
import type { IAttributeRepository } from '../../domain/repositories/iattribute.repository.js';
import type { AttributeEntity } from '../../domain/entities/attributes/attribute.entity.js';
export declare class AttributeRepository implements IAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<AttributeEntity[]>;
    create(entity: AttributeEntity): Promise<boolean>;
    getByCategoryId(categoryId: number): Promise<AttributeEntity[]>;
    private toEntity;
}
