import { WardService } from '../../application/service/ward.service.js';
import type { Request, Response } from 'express';
export declare class WardController {
    private readonly service;
    constructor(service: WardService);
    getByDistrictId(req: Request, districtId: number, res: Response): Promise<Response>;
}
