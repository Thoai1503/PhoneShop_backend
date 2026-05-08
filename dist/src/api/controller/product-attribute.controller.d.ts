import { ProductAttributeService } from '../../application/service/product-attribute.service';
import { ProductAttributeDTO } from '../dto/product.dto';
export declare class ProductAttributeController {
    private readonly service;
    constructor(service: ProductAttributeService);
    update(id: number, entity: ProductAttributeDTO): Promise<boolean>;
}
