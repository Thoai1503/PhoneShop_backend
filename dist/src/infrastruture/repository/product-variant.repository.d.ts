import { PrismaService } from '../database/prisma.service';
import { FilterStateDTO, ProductVariantDTO, ProductVariantPaginatedDTO } from "../../api/dto/product.dto";
export declare class ProductVariantRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(entity: ProductVariantDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<ProductVariantDTO | null>;
    update(entity: ProductVariantDTO): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantDTO[]>;
    getPaginationData(st: FilterStateDTO): Promise<ProductVariantPaginatedDTO>;
    private toDTO;
}
