import { PrismaService } from '../database/prisma.service';
import { ProductDTO, ProductAddAndUpdateStateDTO } from "../../api/dto/product.dto";
export declare class ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<ProductDTO[]>;
    findById(id: number): Promise<ProductDTO | null>;
    createAndReturn(product: ProductAddAndUpdateStateDTO): Promise<ProductDTO | null>;
}
