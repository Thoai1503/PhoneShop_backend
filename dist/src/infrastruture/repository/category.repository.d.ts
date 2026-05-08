import { BaseRepository } from './base.repository';
import { Category } from '../model/category.modal';
import { PrismaService } from '../database/prisma.service';
import { CategoryDTO } from "../../api/dto/category.dto";
export declare class CategoryRepository extends BaseRepository<Category> {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    create(item: CategoryDTO): Promise<CategoryDTO>;
    findById(id: number): Promise<CategoryDTO | null>;
    findAll(): Promise<CategoryDTO[]>;
    update(id: number, item: CategoryDTO): Promise<CategoryDTO | null>;
    deleteById(id: number): Promise<boolean>;
    private toDTO;
}
