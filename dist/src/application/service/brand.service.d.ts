import { BrandRepository } from '../../infrastruture/repository/brand.repository';
import { BrandDTO } from '../../api/dto/brand.dto';
export declare class BrandService {
    private readonly repo;
    constructor(repo: BrandRepository);
    getAll(): Promise<BrandDTO[]>;
}
