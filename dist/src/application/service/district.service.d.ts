import type { DistrictEntity } from '../../domain/entities/district.entity.js';
import { type IDistrictRepository } from '../../domain/repositories/idistrict.repository.js';
import type { IDistrictService } from '../../domain/services/idistrict.service.js';
export declare class DistrictService implements IDistrictService {
    private readonly repo;
    constructor(repo: IDistrictRepository);
    getByProvinceId(provinceId: number): Promise<DistrictEntity[]>;
}
