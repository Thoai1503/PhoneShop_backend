import { BrandService } from '../../application/service/brand.service.js';
import { BrandDTO } from '../dto/brand.dto.js';
export declare class BrandController {
    private readonly service;
    constructor(service: BrandService);
    getAll(): Promise<BrandDTO[]>;
}
