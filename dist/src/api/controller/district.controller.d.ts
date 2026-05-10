import { DistrictService } from '../../application/service/district.service.js';
import type { Request, Response } from 'express';
export declare class DistrictController {
    private readonly service;
    constructor(service: DistrictService);
    getByProvinceId(req: Request, provinceId: number, res: Response): Promise<Response>;
}
