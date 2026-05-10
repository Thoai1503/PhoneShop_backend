import { DistrictRepository } from '../../infrastruture/repository/district.repository.js';
import { DistrictDTO } from '../../api/dto/district.dto.js';
export declare class DistrictService {
    private readonly repo;
    constructor(repo: DistrictRepository);
    getByProvinceId(provinceId: number): Promise<DistrictDTO[]>;
}
