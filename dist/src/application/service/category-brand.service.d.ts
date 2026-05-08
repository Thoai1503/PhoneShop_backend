import { CategoryBrandRepository } from '../../infrastruture/repository/category-brand.repository.js';
import { CategoryBrandDTO } from '../../api/dto/category-brand.dto.js';
export declare class CategoryBrandService {
    private readonly repo;
    constructor(repo: CategoryBrandRepository);
    getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]>;
}
