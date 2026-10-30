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
    getContentVersions(id: number): Promise<import("../../domain/entities/products/product.entity.js").ProductContentVersionsEntity>;
    getContentVersionDetail(id: number, versionId: number): Promise<import("../../domain/entities/products/product.entity.js").ProductContentVersionEntity>;
    compareVersions(id: number, v1: number, v2: number): Promise<import("../../domain/entities/products/product.entity.js").ProductContentComparisonEntity>;
    create(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO>;
    update(request: any, id: number, product: ProductUpdateDTO): Promise<ProductDTO>;
    uploadContentImage(id: number, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    saveProductHtmlContent(id: number, payload: SaveProductContentDTO): Promise<SaveProductContentResultDTO>;
    publishVersion(id: number, versionId: number): Promise<import("../../domain/entities/products/product.entity.js").ProductContentVersionStatusEntity>;
    restoreVersion(id: number, versionId: number): Promise<import("../../domain/entities/products/product.entity.js").ProductContentRestoreEntity>;
    deleteVersion(id: number, versionId: number): Promise<{
        success: boolean;
    }>;
}
