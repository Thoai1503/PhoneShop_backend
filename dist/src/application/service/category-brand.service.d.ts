import { type ICategoryBrandRepository } from '../../domain/repositories/icategory.repository.js';
import type { ICategoryBrandService } from '../../domain/services/icategory.service.js';
import type { CategoryBrandEntity } from '../../domain/entities/categories/category.entity.js';
export declare class CategoryBrandService implements ICategoryBrandService {
    private readonly repo;
    constructor(repo: ICategoryBrandRepository);
    getByCategory(categorySlug: string): Promise<CategoryBrandEntity[]>;
}
