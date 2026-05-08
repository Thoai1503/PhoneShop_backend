import { ProductImageRepository } from '../../infrastruture/repository/product-image.repository.js';
import { ProductImageDTO } from '../../api/dto/product.dto.js';
export declare class ProductImageService {
    private readonly repo;
    constructor(repo: ProductImageRepository);
    create(entity: ProductImageDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByVariantId(variantId: number): Promise<ProductImageDTO[]>;
}
