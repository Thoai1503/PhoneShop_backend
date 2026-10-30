import type { WardEntity } from '../../domain/entities/ward.entity.js';
import { type IWardRepository } from '../../domain/repositories/iward.repository.js';
import type { IWardService } from '../../domain/services/iward.service.js';
export declare class WardService implements IWardService {
    private readonly repo;
    constructor(repo: IWardRepository);
    getByDistrictId(districtId: number): Promise<WardEntity[]>;
}
