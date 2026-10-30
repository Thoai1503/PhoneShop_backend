import type { CategoryAttributeEntity, CategoryAttributeUpdateEntity, CategoryBrandEntity, CategoryEntity } from '../entities/categories/category.entity.js';
export interface ICategoryAttributeRepository {
    getAll(): Promise<CategoryAttributeEntity[]>;
    findById(id: number): Promise<CategoryAttributeEntity | null>;
    create(entity: CategoryAttributeEntity): Promise<boolean>;
    update(entity: CategoryAttributeUpdateEntity): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByCategory(categorySlug: string): Promise<CategoryAttributeEntity[]>;
}
export declare const CATEGORY_ATTRIBUTE_REPOSITORY: unique symbol;
export interface ICategoryBrandRepository {
    getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]>;
}
export declare const CATEGORY_BRAND_REPOSITORY: unique symbol;
export interface ICategoryRepository {
    create(item: CategoryEntity): Promise<CategoryEntity>;
    findById(id: number): Promise<CategoryEntity | null>;
    findAll(): Promise<CategoryEntity[]>;
    update(id: number, item: CategoryEntity): Promise<CategoryEntity | null>;
    deleteById(id: number): Promise<boolean>;
}
export declare const CATEGORY_REPOSITORY: unique symbol;
