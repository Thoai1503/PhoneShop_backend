import { CartRepository } from '../../infrastruture/repository/cart.repository.js';
import { CartDTO } from '../../api/dto/product.dto.js';
export declare class CartService {
    private readonly repo;
    constructor(repo: CartRepository);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
