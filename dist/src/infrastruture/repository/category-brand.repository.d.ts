import { PrismaService } from '../database/prisma.service';
import { CategoryBrandDTO } from "../../api/dto/category-brand.dto";
export declare class CategoryBrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getByCategory(categorySlug: string): Promise<CategoryBrandDTO[]>;
}
