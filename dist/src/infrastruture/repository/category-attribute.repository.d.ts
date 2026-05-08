import { PrismaService } from '../database/prisma.service';
import { CategoryAttributeDTO } from "../../api/dto/category-attribute.dto";
export declare class CategoryAttributeRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<CategoryAttributeDTO[]>;
    findById(id: number): Promise<CategoryAttributeDTO | null>;
    create(entity: CategoryAttributeDTO): Promise<boolean>;
    update(entity: CategoryAttributeDTO): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getByCategory(categorySlug: string): Promise<CategoryAttributeDTO[]>;
    private toDTO;
}
