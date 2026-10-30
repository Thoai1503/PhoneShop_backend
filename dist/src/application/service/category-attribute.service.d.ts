import { type ICategoryAttributeRepository } from '../../domain/repositories/icategory.repository.js';
import type { ICategoryAttributeService } from '../../domain/services/icategory.service.js';
import type { CategoryAttributeEntity, CategoryAttributeUpdateEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryAttributeService implements ICategoryAttributeService {
    private readonly repo;
    constructor(repo: ICategoryAttributeRepository);
    getAll(): Promise<CategoryAttributeEntity[]>;
    findById(id: number): Promise<CategoryAttributeEntity | null>;
    create(entity: CategoryAttributeEntity): Promise<boolean>;
    update(id: number, updateState: CategoryAttributeUpdateEntity): Promise<{
        success: boolean;
        entity?: CategoryAttributeEntity;
    }>;
    delete(id: number): Promise<boolean>;
    getByCategory(categorySlug: string): Promise<CategoryAttributeEntity[]>;
    createMultiple(categoryId: number, attributeIds: number[]): Promise<{
        success: boolean;
        failedId?: number;
    }>;
}
