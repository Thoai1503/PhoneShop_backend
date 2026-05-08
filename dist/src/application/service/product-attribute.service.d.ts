import { ProductAttributeRepository } from '../../infrastruture/repository/product-attribute.repository.js';
import { ProductAttributeDTO } from '../../api/dto/product.dto.js';
export declare class ProductAttributeService {
    private readonly repo;
    constructor(repo: ProductAttributeRepository);
    update(id: number, entity: ProductAttributeDTO): Promise<boolean>;
}
