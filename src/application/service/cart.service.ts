import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../infrastruture/repository/cart.repository.js';
import { CartDTO } from '../../api/dto/product.dto.js';

@Injectable()
export class CartService {
  constructor(private readonly repo: CartRepository) {}

  async create(item: {
    user_id: number;
    variant_id: number;
    quantity: number;
    unit_price?: number | null;
  }): Promise<number> {
    return this.repo.create(item);
  }

  async findByUserId(userId: number): Promise<CartDTO[]> {
    return this.repo.findByUserId(userId);
  }

  async updateQuantity(id: number, quantity: number): Promise<boolean> {
    return this.repo.updateQuantity(id, quantity);
  }

  async deleteById(id: number): Promise<boolean> {
    return this.repo.deleteById(id);
  }

  async deleteByUserId(userId: number): Promise<boolean> {
    return this.repo.deleteByUserId(userId);
  }
}
