import type { ProvinceEntity } from '../../domain/entities/province.entity.js';
import { type IProvinceRepository } from '../../domain/repositories/iprovince.repository.js';
import type { IProvinceService } from '../../domain/services/iprovince.service.js';
export declare class ProvinceService implements IProvinceService {
    private readonly repo;
    constructor(repo: IProvinceRepository);
    findAll(): Promise<ProvinceEntity[]>;
}
