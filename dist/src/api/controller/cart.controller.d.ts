import { CartService } from '../../application/service/cart.service.js';
import type { Request, Response } from 'express';
export declare class CartController {
    private readonly service;
    constructor(service: CartService);
    addToCart(req: Request, body: {
        user_id: number;
        variant_id: number;
        quantity: number;
        unit_price?: number;
    }, res: Response): Promise<Response>;
    findByUserId(req: Request, userId: number, res: Response): Promise<Response>;
    updateQuantity(req: Request, id: number, body: {
        quantity: number | string;
    }, res: Response): Promise<Response>;
    addListToCart(req: Request, body: {
        user_id: number;
        items: Array<{
            variant_id: number;
            quantity: number;
            unit_price?: number;
        }>;
    }, res: Response): Promise<Response>;
    clearCart(req: Request, userId: number, res: Response): Promise<Response>;
}
