import type { BrandEntity, CreateBrandInput } from '../entities/brand.entity.js';
import type { IBaseService } from './ibase.service.js';
export interface IBrandService extends IBaseService<BrandEntity, CreateBrandInput> {
    create(input: CreateBrandInput): Promise<BrandEntity>;
    getAll(): Promise<BrandEntity[]>;
}
