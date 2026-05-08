import { ProductAttributeRepository } from "../../infrastruture/repository/product-attribute.repository";
import { ProductAttributeDTO } from '../../api/dto/product.dto';
export declare class ProductAttributeService {
    private readonly repo;
    constructor(repo: ProductAttributeRepository);
    update(id: number, entity: ProductAttributeDTO): Promise<boolean>;
}
