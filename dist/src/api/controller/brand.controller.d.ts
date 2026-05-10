import { BrandService } from '../../application/service/brand.service.js';
import type { Request, Response } from 'express';
export declare class BrandController {
    private readonly service;
    constructor(service: BrandService);
    createBrand(req: Request, body: {
        id?: number;
        name?: string;
        slug?: string;
        status?: number;
    }, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
}
