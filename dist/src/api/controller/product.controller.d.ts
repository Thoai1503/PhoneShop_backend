import { ProductService } from '../../application/service/product.service.js';
import { ProductAddAndUpdateStateDTO, ProductDTO, SaveProductContentDTO, SaveProductContentResultDTO } from '../dto/product.dto.js';
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
    create(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO>;
    uploadContentImage(id: number, file: Express.Multer.File): Promise<{
        url: string;
    }>;
    saveProductHtmlContent(id: number, payload: SaveProductContentDTO): Promise<SaveProductContentResultDTO>;
}
