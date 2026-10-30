import type { DistrictEntity } from '../entities/district.entity.js';

export interface IDistrictRepository {
  findByProvinceId(provinceId: number): Promise<DistrictEntity[]>;
}

export const DISTRICT_REPOSITORY = Symbol('DISTRICT_REPOSITORY');
