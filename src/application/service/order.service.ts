import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../infrastruture/repository/order.repository.js';
import { OrderDTO } from '../../api/dto/order.dto.js';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderRepository) {}

  async findAll(): Promise<OrderDTO[]> {
    return this.repo.findAll();
  }

  async getByUserId(userId: number): Promise<OrderDTO[]> {
    return this.repo.getByUserId(userId);
  }

  async findById(id: number): Promise<OrderDTO | null> {
    return this.repo.findById(id);
  }
}
