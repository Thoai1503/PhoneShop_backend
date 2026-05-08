import { BrandService } from '../../application/service/brand.service';
import { BrandDTO } from '../dto/brand.dto';
export declare class BrandController {
    private readonly service;
    constructor(service: BrandService);
    getAll(): Promise<BrandDTO[]>;
}
