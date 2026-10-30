import type { CartEntity } from '../entities/cart/cart.entity.js';

export interface ICartService {
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
