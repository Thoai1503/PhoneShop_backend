import type { DistrictEntity } from '../entities/district.entity.js';

export interface IDistrictService {
  getByProvinceId(provinceId: number): Promise<DistrictEntity[]>;
}
