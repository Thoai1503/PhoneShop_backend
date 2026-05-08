import { CartService } from '../../application/service/cart.service.js';
import { CartDTO } from '../dto/product.dto.js';
export declare class CartController {
    private readonly service;
    constructor(service: CartService);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
