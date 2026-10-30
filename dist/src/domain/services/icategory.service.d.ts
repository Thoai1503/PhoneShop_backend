import type { CategoryAttributeEntity, CategoryAttributeUpdateEntity, CategoryBrandEntity, CategoryEntity } from '../entities/categories/category.entity.js';
export interface ICategoryAttributeService {
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
export interface ICategoryBrandService {
    getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]>;
}
export interface ICategoryService {
    getAll(): Promise<CategoryEntity[]>;
    findById(id: number): Promise<CategoryEntity | null>;
    createCategory(categoryData: CategoryEntity): Promise<CategoryEntity>;
    updateCategory(id: number, categoryData: CategoryEntity): Promise<CategoryEntity | null>;
    deleteCategory(id: number): Promise<boolean>;
}
