import { Inject, Injectable } from '@nestjs/common';
import {
  CART_REPOSITORY,
  type ICartRepository,
} from '../../domain/repositories/icart.repository.js';
import type { ICartService } from '../../domain/services/icart.service.js';
import type { CartEntity } from '../../domain/entities/cart/cart.entity.js';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly repo: ICartRepository,
  ) {}

  async create(item: {
    user_id: number;
    variant_id: number;
    quantity: number;
    unit_price?: number | null;
  }): Promise<number> {
    return this.repo.create(item);
  }

  async findByUserId(userId: number): Promise<CartEntity[]> {
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
