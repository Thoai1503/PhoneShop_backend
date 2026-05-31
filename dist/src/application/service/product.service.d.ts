import { ProductRepository } from '../../infrastruture/repository/product.repository.js';
import { ProductDTO, ProductAddAndUpdateStateDTO, ProductUpdateDTO, SaveProductContentResultDTO } from '../../api/dto/product.dto.js';
export declare class ProductService {
    private readonly repo;
    constructor(repo: ProductRepository);
    getAll(): Promise<ProductDTO[]>;
    findById(id: number): Promise<ProductDTO | null>;
    createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null>;
    updateAndReturn(id: number, product: ProductUpdateDTO): Promise<ProductDTO | null>;
    saveHtmlContentByProductId(productId: number, html: string, locale?: string, changeNote?: string | null): Promise<SaveProductContentResultDTO | null>;
    getHtmlContentByProductId(productId: number): Promise<string | null>;
    getPublishedHtmlContentByProductId(productId: number): Promise<string | null>;
    getVersionsList(productId: number, locale?: string): Promise<{
        product_id: number;
        locale: string;
        versions: Array<{
            id: number;
            version_number: number;
            created_at: Date;
            change_note: string | null;
            is_draft: boolean;
            is_published: boolean;
        }>;
        draft_version_id: number | null;
        published_version_id: number | null;
    } | null>;
    getVersionDetail(productId: number, versionId: number, locale?: string): Promise<{
        id: number;
        product_id: number;
        locale: string;
        version_number: number;
        created_at: Date;
        change_note: string | null;
        html: string;
        is_draft: boolean;
        is_published: boolean;
    } | null>;
    publishVersion(productId: number, versionId: number, locale?: string): Promise<{
        product_content_id: number;
        published_version_id: number;
        version_number: number;
    } | null>;
    restoreVersion(productId: number, versionId: number, locale?: string): Promise<{
        product_content_id: number;
        draft_version_id: number;
        version_number: number;
    } | null>;
    deleteVersion(productId: number, versionId: number, locale?: string): Promise<boolean>;
    compareVersions(productId: number, versionId1: number, versionId2: number, locale?: string): Promise<{
        version1: {
            version_number: number;
            html: string;
        };
        version2: {
            version_number: number;
            html: string;
        };
    } | null>;
}
