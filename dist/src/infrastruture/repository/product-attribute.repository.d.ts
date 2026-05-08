import { PrismaService } from '../database/prisma.service.js';
import { ProductAttributeDTO } from '../../api/dto/product.dto.js';
export declare class ProductAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<any | null>;
    update(id: number, entity: ProductAttributeDTO): Promise<boolean>;
}
