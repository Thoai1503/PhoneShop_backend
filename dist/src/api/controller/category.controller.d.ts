import { CategoryService } from '../../application/service/category.service.js';
import { CategoryDTO } from '../dto/category.dto.js';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<CategoryDTO[]>;
    getBySlug(slug: string): string;
    getById(id: number): Promise<CategoryDTO>;
    create(cate: CategoryDTO): Promise<CategoryDTO>;
    update(id: number, cate: CategoryDTO): Promise<CategoryDTO>;
    delete(id: number): Promise<boolean>;
}
