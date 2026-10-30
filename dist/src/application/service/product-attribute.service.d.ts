import { type IProductAttributeRepository } from '../../domain/repositories/iproduct.repository.js';
import type { IProductAttributeService } from '../../domain/services/iproduct.service.js';
import type { ProductAttributeEntity } from '../../domain/entities/products/product.entity.js';
export declare class ProductAttributeService implements IProductAttributeService {
    private readonly repo;
    constructor(repo: IProductAttributeRepository);
    update(id: number, entity: ProductAttributeEntity): Promise<boolean>;
}
