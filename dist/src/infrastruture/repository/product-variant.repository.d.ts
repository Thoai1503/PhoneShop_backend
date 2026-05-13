import { PrismaService } from '../database/prisma.service.js';
import { FilterStateDTO, ProductVariantDTO, ProductVariantPaginatedDTO } from '../../api/dto/product.dto.js';
import { CatalogSaveChangesService } from '../database/catalog-save-changes.service.js';
export declare class ProductVariantRepository {
    private readonly prisma;
    private readonly catalogSaveChangesService;
    constructor(prisma: PrismaService, catalogSaveChangesService: CatalogSaveChangesService);
    create(entity: ProductVariantDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    findById(id: number): Promise<ProductVariantDTO | null>;
    update(entity: ProductVariantDTO): Promise<boolean>;
    findByProductId(productId: number): Promise<ProductVariantDTO[]>;
    getPaginationData(st: FilterStateDTO): Promise<ProductVariantPaginatedDTO>;
    private toDTO;
}
