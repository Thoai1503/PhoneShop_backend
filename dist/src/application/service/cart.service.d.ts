import { CartRepository } from '../../infrastruture/repository/cart.repository.js';
import { CartDTO } from '../../api/dto/product.dto.js';
export declare class CartService {
    private readonly repo;
    constructor(repo: CartRepository);
    create(item: {
        user_id: number;
        variant_id: number;
        quantity: number;
        unit_price?: number | null;
    }): Promise<number>;
    findByUserId(userId: number): Promise<CartDTO[]>;
    updateQuantity(id: number, quantity: number): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    deleteByUserId(userId: number): Promise<boolean>;
}
