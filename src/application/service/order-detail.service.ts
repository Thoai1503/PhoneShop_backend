import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_DETAIL_REPOSITORY,
  type IOrderDetailRepository,
} from '../../domain/repositories/iorder.repository.js';
import type { IOrderDetailService } from '../../domain/services/iorder.service.js';
import type { OrderDetailEntity } from '../../domain/entities/orders/order.entity.js';

@Injectable()
export class OrderDetailService implements IOrderDetailService {
  constructor(
    @Inject(ORDER_DETAIL_REPOSITORY)
    private readonly repo: IOrderDetailRepository,
  ) {}

  async findByOrderId(orderId: number): Promise<OrderDetailEntity[]> {
    return this.repo.findByOrderId(orderId);
  }
}
