import { CategoryRepository } from '../../infrastruture/repository/category.repository';
import { CategoryDTO } from '../../api/dto/category.dto';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getAll(): Promise<CategoryDTO[]>;
    findById(id: number): Promise<CategoryDTO | null>;
    createCategory(categoryData: CategoryDTO): Promise<CategoryDTO>;
    updateCategory(id: number, categoryData: CategoryDTO): Promise<CategoryDTO | null>;
    deleteCategory(id: number): Promise<boolean>;
}
