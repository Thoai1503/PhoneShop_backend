import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryRepository } from '../../domain/repositories/icategory.repository.js';
import type { CategoryEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryRepository extends BaseRepository implements ICategoryRepository {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    create(item: CategoryEntity): Promise<CategoryEntity>;
    findById(id: number): Promise<CategoryEntity | null>;
    findAll(): Promise<CategoryEntity[]>;
    update(id: number, item: CategoryEntity): Promise<CategoryEntity | null>;
    deleteById(id: number): Promise<boolean>;
    private toEntity;
}
