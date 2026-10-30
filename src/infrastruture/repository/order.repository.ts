import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { IOrderRepository } from '../../domain/repositories/iorder.repository.js';
import type { OrderEntity } from '../../domain/entities/orders/order.entity.js';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(): Promise<OrderEntity[]> {
    const list = await this.prisma.orders.findMany({
      include: { users: true, user_addresses: true },
      orderBy: {
        created_at: 'desc',
      },
    });

    return list.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      discount: Number(item.discount),
      total: Number(item.total),
      address_id: item.address_id ?? undefined,
      status: item.status,
      created_at: item.created_at,
      user: {
        id: item.users.id,
        name: item.users.full_name,
        email: item.users.email,
        phone: item.users.phone,
        status: item.users.status,
      },
    }));
  }

  async findById(id: number): Promise<OrderEntity | null> {
    const item = await this.prisma.orders.findUnique({
      where: { id },
      include: { users: true, user_addresses: true },
    });

    if (!item) return null;

    return {
      id: item.id,
      user_id: item.user_id,
      discount: Number(item.discount),
      total: Number(item.total),
      address_id: item.address_id ?? undefined,
      status: item.status,
      created_at: item.created_at,
      user: {
        id: item.users.id,
        name: item.users.full_name,
        email: item.users.email,
        phone: item.users.phone,
        status: item.users.status,
      },
    };
  }

  async getByUserId(userId: number): Promise<OrderEntity[]> {
    const list = await this.prisma.orders.findMany({
      where: { user_id: userId },
    });

    return list.map((item) => ({
      id: item.id,
      user_id: userId,
      discount: Number(item.discount),
      total: Number(item.total),
      address_id: item.address_id ?? undefined,
      status: item.status,
      created_at: item.created_at,
      user: null,
    }));
  }
}
