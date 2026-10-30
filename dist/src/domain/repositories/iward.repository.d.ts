import type { WardEntity } from '../entities/ward.entity.js';
export interface IWardRepository {
    findByDistrictId(districtId: number): Promise<WardEntity[]>;
}
export declare const WARD_REPOSITORY: unique symbol;
