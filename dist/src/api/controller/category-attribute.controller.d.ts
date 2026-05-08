import { CategoryAttributeService } from '../../application/service/category-attribute.service.js';
import { CategoryAttributeDTO, CategoryAttributeUpdateStateDTO } from '../dto/category-attribute.dto.js';
export declare class CategoryAttributeController {
    private readonly service;
    constructor(service: CategoryAttributeService);
    getAll(): Promise<CategoryAttributeDTO[]>;
    getByCategory(category: string): Promise<CategoryAttributeDTO[]>;
    create(entity: CategoryAttributeDTO): Promise<boolean>;
    update(id: number, entity: CategoryAttributeUpdateStateDTO): Promise<CategoryAttributeDTO>;
    delete(id: number): Promise<boolean>;
    createMultipleAttr(categoryId: number, ints: number[]): Promise<boolean | object>;
}
