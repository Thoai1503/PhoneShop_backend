import type { Request, Response } from 'express';
import { OrderDetailService } from '../../application/service/order-detail.service.js';
export declare class OrderDetailController {
    private readonly service;
    constructor(service: OrderDetailService);
    getAllOrder(req: Request, orderId: number, res: Response): Promise<Response>;
}
