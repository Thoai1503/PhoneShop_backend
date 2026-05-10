import { ProvinceRepository } from '../../infrastruture/repository/province.repository.js';
import { ProvinceDTO } from '../../api/dto/province.dto.js';
export declare class ProvinceService {
    private readonly repo;
    constructor(repo: ProvinceRepository);
    findAll(): Promise<ProvinceDTO[]>;
}
