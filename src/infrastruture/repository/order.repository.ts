import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { OrderDTO, OrderUserDTO } from '../../api/dto/order.dto.js';

@Injectable()
export class OrderRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(): Promise<OrderDTO[]> {
    const list = await this.prisma.orders.findMany({
      include: { users: true, user_addresses: true },
      orderBy: {
        created_at: 'desc',
      },
    });

    return list.map((item) => {
      const dto = new OrderDTO();
      dto.id = item.id;
      dto.user_id = item.user_id;
      dto.discount = Number(item.discount);
      dto.total = Number(item.total);
      dto.address_id = item.address_id ?? undefined;
      dto.status = item.status;
      dto.created_at = item.created_at;

      const userDto = new OrderUserDTO();
      userDto.id = item.users.id;
      userDto.name = item.users.full_name;
      userDto.email = item.users.email;
      userDto.phone = item.users.phone;
      userDto.status = item.users.status;
      dto.user = userDto;

      return dto;
    });
  }

  async findById(id: number): Promise<OrderDTO | null> {
    const item = await this.prisma.orders.findUnique({
      where: { id },
      include: { users: true, user_addresses: true },
    });

    if (!item) return null;

    const dto = new OrderDTO();
    dto.id = item.id;
    dto.user_id = item.user_id;
    dto.discount = Number(item.discount);
    dto.total = Number(item.total);
    dto.address_id = item.address_id ?? undefined;
    dto.status = item.status;
    dto.created_at = item.created_at;

    const userDto = new OrderUserDTO();
    userDto.id = item.users.id;
    userDto.name = item.users.full_name;
    userDto.email = item.users.email;
    userDto.phone = item.users.phone;
    userDto.status = item.users.status;
    dto.user = userDto;

    return dto;
  }

  async getByUserId(userId: number): Promise<OrderDTO[]> {
    const list = await this.prisma.orders.findMany({
      where: { user_id: userId },
    });

    return list.map((item) => {
      const dto = new OrderDTO();
      dto.id = item.id;
      dto.user_id = userId;
      dto.discount = Number(item.discount);
      dto.total = Number(item.total);
      dto.address_id = item.address_id ?? undefined;
      dto.status = item.status;
      dto.created_at = item.created_at;
      return dto;
    });
  }
}
