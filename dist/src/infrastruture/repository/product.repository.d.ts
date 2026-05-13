import { PrismaService } from '../database/prisma.service.js';
import { ProductDTO, ProductAddAndUpdateStateDTO } from '../../api/dto/product.dto.js';
export declare class ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<ProductDTO[]>;
    findById(id: number): Promise<ProductDTO | null>;
    createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null>;
    saveHtmlContentByProductId(productId: number, html: string, locale?: string, changeNote?: string | null): Promise<{
        product_id: number;
        locale: string;
        product_content_id: number;
        draft_version_id: number;
        version_number: number;
    } | null>;
    getHtmlContentByProductId(productId: number): Promise<string | null>;
}
