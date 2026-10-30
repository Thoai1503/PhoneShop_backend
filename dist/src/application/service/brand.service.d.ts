import type { BrandEntity, CreateBrandInput } from '../../domain/entities/brand.entity.js';
import { type IBrandRepository } from '../../domain/repositories/ibrand.repository.js';
import type { IBrandService } from '../../domain/services/ibrand.service.js';
export declare class BrandService implements IBrandService {
    private readonly repo;
    constructor(repo: IBrandRepository);
    create(brand: CreateBrandInput): Promise<BrandEntity>;
    getAll(): Promise<BrandEntity[]>;
}
