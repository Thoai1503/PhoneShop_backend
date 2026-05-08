import { ProductRepository } from '../../infrastruture/repository/product.repository';
import { ProductDTO, ProductAddAndUpdateStateDTO } from '../../api/dto/product.dto';
export declare class ProductService {
    private readonly repo;
    constructor(repo: ProductRepository);
    getAll(): Promise<ProductDTO[]>;
    findById(id: number): Promise<ProductDTO | null>;
    createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null>;
}
