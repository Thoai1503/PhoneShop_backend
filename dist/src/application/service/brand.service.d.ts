import { BrandRepository } from '../../infrastruture/repository/brand.repository.js';
import { BrandDTO } from '../../api/dto/brand.dto.js';
export declare class BrandService {
    private readonly repo;
    constructor(repo: BrandRepository);
    create(brand: BrandDTO): Promise<number>;
    getAll(): Promise<BrandDTO[]>;
}
