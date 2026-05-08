import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
  CartDTO,
  ProductImageDTO,
  ProductVariantDTO,
} from 'src/api/dto/product.dto';

@Injectable()
export class CartRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

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
