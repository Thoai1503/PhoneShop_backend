import { ProvinceService } from '../../application/service/province.service.js';
import type { Request, Response } from 'express';
export declare class ProvinceController {
    private readonly service;
    constructor(service: ProvinceService);
    getAll(req: Request, res: Response): Promise<Response>;
}
