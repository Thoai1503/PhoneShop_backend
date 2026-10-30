import { type ICartRepository } from '../../domain/repositories/icart.repository.js';
import type { ICartService } from '../../domain/services/icart.service.js';
import type { CartEntity } from '../../domain/entities/cart/cart.entity.js';
export declare class CartService implements ICartService {
    private readonly repo;
    constructor(repo: ICartRepository);
    create(item: {
        user_id: number;
        variant_id: number;
        quantity: number;
        unit_price?: number | null;
    }): Promise<number>;
    findByUserId(userId: number): Promise<CartEntity[]>;
    updateQuantity(id: number, quantity: number): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    deleteByUserId(userId: number): Promise<boolean>;
}
