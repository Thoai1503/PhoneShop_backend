import { ProductService } from '../../application/service/product.service.js';
import { ProductAddAndUpdateStateDTO, ProductDTO, ProductUpdateDTO, SaveProductContentDTO, SaveProductContentResultDTO } from '../dto/product.dto.js';
import { CloudinaryService } from '../../service/cloudinary.service.js';
export declare class ProductController {
    private readonly service;
    private readonly cloudinaryService;
    constructor(service: ProductService, cloudinaryService: CloudinaryService);
    getAll(): Promise<ProductDTO[]>;
    getById(id: number): Promise<ProductDTO>;
    getProductHtmlContent(id: number): Promise<{
        html: string;
    }>;
    getPublishedProductHtmlContent(id: number): Promise<{
        html: string;
    }>;
    getContentVersions(id: number): Promise<{
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
    }>;
    getContentVersionDetail(id: number, versionId: number): Promise<{
        id: number;
        product_id: number;
        locale: string;
        version_number: number;
        created_at: Date;
        change_note: string | null;
        html: string;
        is_draft: boolean;
        is_published: boolean;
    }>;
    compareVersions(id: number, v1: number, v2: number): Promise<{
        version1: {
            version_number: number;
            html: string;
        };
        version2: {
            version_number: number;
            html: string;
        };
    }>;
    create(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO>;
    update(request: any, id: number, product: ProductUpdateDTO): Promise<ProductDTO>;
    uploadContentImage(id: number, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    saveProductHtmlContent(id: number, payload: SaveProductContentDTO): Promise<SaveProductContentResultDTO>;
    publishVersion(id: number, versionId: number): Promise<{
        product_content_id: number;
        published_version_id: number;
        version_number: number;
    }>;
    restoreVersion(id: number, versionId: number): Promise<{
        product_content_id: number;
        draft_version_id: number;
        version_number: number;
    }>;
    deleteVersion(id: number, versionId: number): Promise<{
        success: boolean;
    }>;
}
