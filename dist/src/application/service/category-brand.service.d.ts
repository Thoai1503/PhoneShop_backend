import { CategoryBrandRepository } from "../../infrastruture/repository/category-brand.repository";
import { CategoryBrandDTO } from '../../api/dto/category-brand.dto';
export declare class CategoryBrandService {
    private readonly repo;
    constructor(repo: CategoryBrandRepository);
    getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]>;
}
