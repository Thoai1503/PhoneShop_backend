import { CategoryBrandService } from '../../application/service/category-brand.service';
import { CategoryBrandDTO } from '../dto/category-brand.dto';
export declare class CategoryBrandController {
    private readonly service;
    constructor(service: CategoryBrandService);
    getByCategory(category: string): Promise<CategoryBrandDTO[]>;
}
