import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

type CartItem = {
  variant_id: number;
  quantity: number;
  unit_price: unknown;
};

@Injectable()
export class PaymentRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getCartItemsByUserId(userId: number): Promise<CartItem[]> {
    return this.prisma.cart.findMany({
      where: { user_id: userId },
      select: {
        variant_id: true,
        quantity: true,
        unit_price: true,
      },
    });
  }

  async createOrderFromCart(payload: {
    userId: number;
    amount: number;
    addressId?: number | null;
  }): Promise<{ orderId: number; cartCount: number }> {
    return this.prisma.$transaction(async (tx) => {
      const cartItems = await tx.cart.findMany({
        where: { user_id: payload.userId },
        select: {
          variant_id: true,
          quantity: true,
          unit_price: true,
        },
      });

      const order = await tx.orders.create({
        data: {
          user_id: payload.userId,
          discount: 0,
          total: payload.amount,
          address_id: payload.addressId ?? null,
          status: 1,
        },
      });

      if (cartItems.length > 0) {
        await tx.order_detail.createMany({
          data: cartItems.map((item) => ({
            order_id: order.id,
            variant_id: item.variant_id,
            quantity: item.quantity,
          })),
        });
      }

      await tx.cart.deleteMany({
        where: { user_id: payload.userId },
      });

      return {
        orderId: order.id,
        cartCount: cartItems.length,
      };
    });
  }

  async getPendingOrderByUserId(userId: number) {
    return this.prisma.orders.findFirst({
      where: {
        user_id: userId,
        status: 1,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async updateOrderStatus(orderId: number, status: number): Promise<boolean> {
    const result = await this.prisma.orders.updateMany({
      where: { id: orderId },
      data: { status },
    });
    return result.count > 0;
  }

  async deleteCartByUserId(userId: number): Promise<boolean> {
    await this.prisma.cart.deleteMany({
      where: { user_id: userId },
    });
    return true;
  }
}
