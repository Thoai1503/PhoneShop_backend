import type { WardEntity } from '../entities/ward.entity.js';

export interface IWardRepository {
  findByDistrictId(districtId: number): Promise<WardEntity[]>;
}

export const WARD_REPOSITORY = Symbol('WARD_REPOSITORY');
