import { WardRepository } from '../../infrastruture/repository/ward.repository.js';
import { WardDTO } from '../../api/dto/ward.dto.js';
export declare class WardService {
    private readonly repo;
    constructor(repo: WardRepository);
    getByDistrictId(districtId: number): Promise<WardDTO[]>;
}
