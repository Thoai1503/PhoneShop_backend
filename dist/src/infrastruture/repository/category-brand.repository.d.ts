import { PrismaService } from '../database/prisma.service.js';
import { CategoryBrandDTO } from '../../api/dto/category-brand.dto.js';
export declare class CategoryBrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]>;
}
