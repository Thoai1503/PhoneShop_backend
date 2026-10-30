import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  type IOrderRepository,
} from '../../domain/repositories/iorder.repository.js';
import type { IOrderService } from '../../domain/services/iorder.service.js';
import type { OrderEntity } from '../../domain/entities/orders/order.entity.js';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: IOrderRepository,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.repo.findAll();
  }

  async getByUserId(userId: number): Promise<OrderEntity[]> {
    return this.repo.getByUserId(userId);
  }

  async findById(id: number): Promise<OrderEntity | null> {
    return this.repo.findById(id);
  }
}
