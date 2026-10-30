import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { ICartRepository } from '../../domain/repositories/icart.repository.js';
import type { CartEntity } from '../../domain/entities/cart/cart.entity.js';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(item: {
    user_id: number;
    variant_id: number;
    quantity: number;
    unit_price?: number | null;
  }): Promise<number> {
    const created = await this.prisma.cart.create({
      data: {
        user_id: item.user_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price ?? null,
      },
    });
    return created.id;
  }

  async updateQuantity(id: number, quantity: number): Promise<boolean> {
    const updated = await this.prisma.cart.updateMany({
      where: { id },
      data: { quantity },
    });
    return updated.count > 0;
  }

  async deleteById(id: number): Promise<boolean> {
    const deleted = await this.prisma.cart.deleteMany({ where: { id } });
    return deleted.count > 0;
  }

  async deleteByUserId(userId: number): Promise<boolean> {
    await this.prisma.cart.deleteMany({
      where: { user_id: userId },
    });
    return true;
  }

  async findByUserId(userId: number): Promise<CartEntity[]> {
    const list = await this.prisma.cart.findMany({
      where: { user_id: userId },
      include: {
        product_variants: { include: { product_image: true } },
      },
    });
    return list.map((c) => {
      return {
        id: c.id,
        user_id: c.user_id,
        variant_id: c.variant_id,
        quantity: c.quantity,
        unit_price: Number(c.unit_price ?? 0),
        variant: {
          id: c.product_variants.id,
          name: c.product_variants.name,
          price: c.product_variants.price,
          product_id: 0,
          sku: '',
          status: 0,
          created_at: null,
          product: null,
          product_images: c.product_variants.product_image.map((img) => ({
            id: img.id,
            product_id: img.product_id,
            variant_id: img.variant_id,
            url: img.url,
          })),
          variant_attributes: null,
        },
      };
    });
  }
}
