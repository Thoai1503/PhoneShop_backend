import type { ProvinceEntity } from '../entities/province.entity.js';

export interface IProvinceRepository {
  findAll(): Promise<ProvinceEntity[]>;
}

export const PROVINCE_REPOSITORY = Symbol('PROVINCE_REPOSITORY');
