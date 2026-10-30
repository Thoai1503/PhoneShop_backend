import type {
  BrandEntity,
  CreateBrandInput,
} from '../entities/brand.entity.js';
import type { IBaseRepository } from './ibase.repository.js';

export interface IBrandRepository extends IBaseRepository<
  BrandEntity,
  CreateBrandInput
> {
  create(input: CreateBrandInput): Promise<BrandEntity>;
}

export const BRAND_REPOSITORY = Symbol('BRAND_REPOSITORY');
