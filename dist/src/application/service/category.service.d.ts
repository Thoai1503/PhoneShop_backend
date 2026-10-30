import { type ICategoryRepository } from '../../domain/repositories/icategory.repository.js';
import type { ICategoryService } from '../../domain/services/icategory.service.js';
import type { CategoryEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryService implements ICategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: ICategoryRepository);
    getAll(): Promise<CategoryEntity[]>;
    findById(id: number): Promise<CategoryEntity | null>;
    createCategory(categoryData: CategoryEntity): Promise<CategoryEntity>;
    updateCategory(id: number, categoryData: CategoryEntity): Promise<CategoryEntity | null>;
    deleteCategory(id: number): Promise<boolean>;
}
