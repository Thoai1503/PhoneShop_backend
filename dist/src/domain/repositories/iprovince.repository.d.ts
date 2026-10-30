import type { ProvinceEntity } from '../entities/province.entity.js';
export interface IProvinceRepository {
    findAll(): Promise<ProvinceEntity[]>;
}
export declare const PROVINCE_REPOSITORY: unique symbol;
