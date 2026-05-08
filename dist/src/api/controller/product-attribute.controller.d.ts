import { ProductAttributeService } from '../../application/service/product-attribute.service.js';
import { ProductAttributeDTO } from '../dto/product.dto.js';
export declare class ProductAttributeController {
    private readonly service;
    constructor(service: ProductAttributeService);
    update(id: number, entity: ProductAttributeDTO): Promise<boolean>;
}
