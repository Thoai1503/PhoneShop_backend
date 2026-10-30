import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryAttributeRepository } from '../../domain/repositories/icategory.repository.js';
import type { CategoryAttributeEntity, CategoryAttributeUpdateEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryAttributeRepository implements ICategoryAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<CategoryAttributeEntity[]>;
    findById(id: number): Promise<CategoryAttributeEntity | null>;
    create(entity: CategoryAttributeEntity): Promise<boolean>;
    update(entity: CategoryAttributeUpdateEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByCategory(categorySlug: string): Promise<CategoryAttributeEntity[]>;
    private toEntity;
}
