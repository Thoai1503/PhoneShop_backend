import type { WardEntity } from '../entities/ward.entity.js';
export interface IWardService {
    getByDistrictId(districtId: number): Promise<WardEntity[]>;
}
