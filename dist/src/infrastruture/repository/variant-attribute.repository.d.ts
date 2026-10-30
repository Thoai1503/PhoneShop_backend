import { PrismaService } from '../database/prisma.service.js';
import type { IVariantAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { VariantAttributeEntity } from '../../domain/entities/products/product.entity.js';
export declare class VariantAttributeRepository implements IVariantAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<VariantAttributeEntity[]>;
    updateFromList(list: VariantAttributeEntity[]): Promise<boolean>;
    private toEntity;
}
