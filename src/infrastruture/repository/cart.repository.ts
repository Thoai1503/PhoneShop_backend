import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import {
  CartDTO,
  ProductImageDTO,
  ProductVariantDTO,
} from '../../api/dto/product.dto.js';

@Injectable()
export class CartRepository {
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

  async findByUserId(userId: number): Promise<CartDTO[]> {
    const list = await this.prisma.cart.findMany({
      where: { user_id: userId },
      include: {
        product_variants: { include: { product_image: true } },
      },
    });
    return list.map((c) => {
      const dto = new CartDTO();
      dto.id = c.id;
      dto.user_id = c.user_id;
      dto.variant_id = c.variant_id;
      dto.quantity = c.quantity;
      dto.unit_price = Number(c.unit_price ?? 0);

      const vDto = new ProductVariantDTO();
      vDto.id = c.product_variants.id;
      vDto.name = c.product_variants.name;
      vDto.price = c.product_variants.price;
      vDto.product_images = c.product_variants.product_image.map((img) => {
        const imgDto = new ProductImageDTO();
        imgDto.id = img.id;
        imgDto.product_id = img.product_id;
        imgDto.variant_id = img.variant_id;
        imgDto.url = img.url;
        return imgDto;
      });
      dto.variant = vDto;

      return dto;
    });
  }
}
