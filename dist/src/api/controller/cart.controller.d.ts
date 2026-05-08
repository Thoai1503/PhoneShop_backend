import { CartService } from "../../application/service/cart.service";
import { CartDTO } from '../dto/product.dto';
export declare class CartController {
    private readonly service;
    constructor(service: CartService);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
