import { ProductService } from '../../application/service/product.service';
import { ProductAddAndUpdateStateDTO, ProductDTO } from '../dto/product.dto';
export declare class ProductController {
    private readonly service;
    constructor(service: ProductService);
    getAll(): Promise<ProductDTO[]>;
    getById(id: number): Promise<ProductDTO>;
    create(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO>;
}
