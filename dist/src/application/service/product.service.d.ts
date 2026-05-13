import { ProductRepository } from '../../infrastruture/repository/product.repository.js';
import { ProductDTO, ProductAddAndUpdateStateDTO, SaveProductContentResultDTO } from '../../api/dto/product.dto.js';
export declare class ProductService {
    private readonly repo;
    constructor(repo: ProductRepository);
    getAll(): Promise<ProductDTO[]>;
    findById(id: number): Promise<ProductDTO | null>;
    createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null>;
    saveHtmlContentByProductId(productId: number, html: string, locale?: string, changeNote?: string | null): Promise<SaveProductContentResultDTO | null>;
    getHtmlContentByProductId(productId: number): Promise<string | null>;
}
