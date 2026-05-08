import { CategoryBrandService } from '../../application/service/category-brand.service.js';
import { CategoryBrandDTO } from '../dto/category-brand.dto.js';
export declare class CategoryBrandController {
    private readonly service;
    constructor(service: CategoryBrandService);
    getByCategory(category: string): Promise<CategoryBrandDTO[]>;
}
