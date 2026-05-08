import { ProductVariantRepository } from '../../infrastruture/repository/product-variant.repository.js';
import { FilterStateDTO, ProductVariantDTO, ProductVariantPaginatedDTO } from '../../api/dto/product.dto.js';
export declare class ProductVariantService {
    private readonly repo;
    constructor(repo: ProductVariantRepository);
    getPaginationData(st: FilterStateDTO): Promise<ProductVariantPaginatedDTO>;
    findById(id: number): Promise<ProductVariantDTO | null>;
    create(entity: ProductVariantDTO): Promise<boolean>;
    update(entity: ProductVariantDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantDTO[]>;
}
