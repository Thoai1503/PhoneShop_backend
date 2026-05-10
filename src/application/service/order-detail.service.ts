import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from '../../infrastruture/repository/order-detail.repository.js';
import { OrderDetailDTO } from '../../api/dto/order-detail.dto.js';

@Injectable()
export class OrderDetailService {
  constructor(private readonly repo: OrderDetailRepository) {}

  async findByOrderId(orderId: number): Promise<OrderDetailDTO[]> {
    return this.repo.findByOrderId(orderId);
  }
}
