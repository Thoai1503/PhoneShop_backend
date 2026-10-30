import { BrandService } from '../../application/service/brand.service.js';
import { BrandDTO } from '../dto/brand.dto.js';
import type { Request, Response } from 'express';
export declare class BrandController {
    private readonly service;
    constructor(service: BrandService);
    createBrand(req: Request, body: BrandDTO, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
}
