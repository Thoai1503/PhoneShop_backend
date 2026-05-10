import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import { CategoryDTO } from '../../api/dto/category.dto.js';
export declare class CategoryRepository extends BaseRepository {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    create(item: CategoryDTO): Promise<CategoryDTO>;
    findById(id: number): Promise<CategoryDTO | null>;
    findAll(): Promise<CategoryDTO[]>;
    update(id: number, item: CategoryDTO): Promise<CategoryDTO | null>;
    deleteById(id: number): Promise<boolean>;
    private toDTO;
}
