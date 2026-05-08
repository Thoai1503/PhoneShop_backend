import { Injectable } from '@nestjs/common';
import { CartRepository } from '../../infrastruture/repository/cart.repository.js';
import { CartDTO } from '../../api/dto/product.dto.js';

@Injectable()
export class CartService {
  constructor(private readonly repo: CartRepository) {}

  async findByUserId(userId: number): Promise<CartDTO[]> {
    return this.repo.findByUserId(userId);
  }
}
