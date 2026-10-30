import type { BrandEntity, CreateBrandInput } from '../entities/brand.entity.js';
import type { IBaseRepository } from './ibase.repository.js';
export interface IBrandRepository extends IBaseRepository<BrandEntity, CreateBrandInput> {
    create(input: CreateBrandInput): Promise<BrandEntity>;
}
export declare const BRAND_REPOSITORY: unique symbol;
