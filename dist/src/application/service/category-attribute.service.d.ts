import { CategoryAttributeRepository } from '../../infrastruture/repository/category-attribute.repository.js';
import { CategoryAttributeDTO, CategoryAttributeUpdateStateDTO } from '../../api/dto/category-attribute.dto.js';
export declare class CategoryAttributeService {
    private readonly repo;
    constructor(repo: CategoryAttributeRepository);
    getAll(): Promise<CategoryAttributeDTO[]>;
    findById(id: number): Promise<CategoryAttributeDTO | null>;
    create(entity: CategoryAttributeDTO): Promise<boolean>;
    update(id: number, updateState: CategoryAttributeUpdateStateDTO): Promise<{
        success: boolean;
        entity?: CategoryAttributeDTO;
    }>;
    delete(id: number): Promise<boolean>;
    getByCategory(categorySlug: string): Promise<CategoryAttributeDTO[]>;
    createMultiple(categoryId: number, attributeIds: number[]): Promise<{
        success: boolean;
        failedId?: number;
    }>;
}
