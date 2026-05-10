import type { Request, Response } from 'express';
import { OrderService } from '../../application/service/order.service.js';
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    getAllOrder(req: Request, pageQuery: string, searchQuery: string, res: Response): Promise<Response>;
    getByUserId(req: Request, userId: number, res: Response): Promise<Response>;
    getById(req: Request, id: number, res: Response): Promise<Response>;
}
