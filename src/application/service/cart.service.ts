import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/infrastruture/repository/cart.repository';
import { CartDTO } from '../../api/dto/product.dto';

@Injectable()
export class CartService {
  constructor(private readonly repo: CartRepository) {}

  async findByUserId(userId: number): Promise<CartDTO[]> {
    return this.repo.findByUserId(userId);
  }
}
