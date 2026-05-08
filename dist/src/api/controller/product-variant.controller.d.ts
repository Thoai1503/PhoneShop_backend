import { ProductVariantService } from "../../application/service/product-variant.service";
import { ProductVariantDTO, ProductVariantPaginatedDTO } from '../dto/product.dto';
export declare class ProductVariantController {
    private readonly service;
    constructor(service: ProductVariantService);
    getAll(query: Record<string, any>): Promise<ProductVariantPaginatedDTO>;
    getById(id: number): Promise<ProductVariantDTO>;
    create(entity: ProductVariantDTO): Promise<boolean>;
    updateVariant(entity: ProductVariantDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantDTO[]>;
    private parseFilterState;
}
