import type { ProvinceEntity } from '../entities/province.entity.js';

export interface IProvinceService {
  findAll(): Promise<ProvinceEntity[]>;
}
