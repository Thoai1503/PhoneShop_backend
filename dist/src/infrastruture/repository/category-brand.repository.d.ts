import { PrismaService } from '../database/prisma.service.js';
import type { ICategoryBrandRepository } from '../../domain/repositories/icategory.repository.js';
import type { CategoryBrandEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryBrandRepository implements ICategoryBrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]>;
}
