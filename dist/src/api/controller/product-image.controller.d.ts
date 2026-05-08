import { ProductImageService } from "../../application/service/product-image.service";
import { ProductImageDTO } from '../dto/product.dto';
export declare class ProductImageController {
    private readonly service;
    constructor(service: ProductImageService);
    delete(id: number): Promise<boolean>;
    createByVariantId(_variantId: number, images: Express.Multer.File[], productId: string, variantId: string): Promise<boolean>;
    getByVariantId(variantId: number): Promise<ProductImageDTO[]>;
}
