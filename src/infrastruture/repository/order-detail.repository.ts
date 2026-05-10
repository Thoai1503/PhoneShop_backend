import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { OrderDetailDTO } from '../../api/dto/order-detail.dto.js';

@Injectable()
export class OrderDetailRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByOrderId(orderId: number): Promise<OrderDetailDTO[]> {
    const list = await this.prisma.order_detail.findMany({
      where: {
        order_id: orderId,
      },
    });

    return list.map((item) => {
      const dto = new OrderDetailDTO();
      dto.id = item.id;
      dto.order_id = item.order_id;
      dto.variant_id = item.variant_id;
      dto.quantity = item.quantity;
      return dto;
    });
  }
}
