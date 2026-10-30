import { PrismaService } from '../database/prisma.service.js';
import type { BrandEntity, CreateBrandInput } from '../../domain/entities/brand.entity.js';
import type { IBrandRepository } from '../../domain/repositories/ibrand.repository.js';
import { BaseRepository } from './base.repository.js';
export declare class BrandRepository extends BaseRepository implements IBrandRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: CreateBrandInput): Promise<BrandEntity>;
    findById(id: number): Promise<BrandEntity | null>;
    findAll(): Promise<BrandEntity[]>;
    update(id: number, input: Partial<CreateBrandInput>): Promise<BrandEntity | null>;
    delete(id: number): Promise<boolean>;
    private toEntity;
}
