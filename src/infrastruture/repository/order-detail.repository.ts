import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IOrderDetailRepository } from '../../domain/repositories/iorder.repository.js';
import type { OrderDetailEntity } from '../../domain/entities/orders/order.entity.js';

@Injectable()
export class OrderDetailRepository implements IOrderDetailRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByOrderId(orderId: number): Promise<OrderDetailEntity[]> {
    const list = await this.prisma.order_detail.findMany({
      where: {
        order_id: orderId,
      },
    });

    return list.map((item) => ({
      id: item.id,
      order_id: item.order_id,
      variant_id: item.variant_id !== null ? Number(item.variant_id) : 0,
      quantity: item.quantity,
    }));
  }
}
