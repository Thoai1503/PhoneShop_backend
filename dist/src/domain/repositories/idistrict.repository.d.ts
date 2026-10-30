import type { DistrictEntity } from '../entities/district.entity.js';
export interface IDistrictRepository {
    findByProvinceId(provinceId: number): Promise<DistrictEntity[]>;
}
export declare const DISTRICT_REPOSITORY: unique symbol;
