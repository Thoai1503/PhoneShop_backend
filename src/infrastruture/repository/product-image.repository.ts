import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProductImageDTO } from '../../api/dto/product.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ProductImageRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(entity: ProductImageDTO): Promise<boolean> {
    try {
      await this.prisma.product_image.create({
        data: {
          product_id: entity.product_id,
          variant_id: entity.variant_id,
          url: entity.url ?? '',
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const en = await this.prisma.product_image.findUnique({ where: { id } });
      if (!en) return false;

      const fileName = path.basename(en.url);
      const uploadsFolder = path.join(process.cwd(), 'Uploads');
      const filePath = path.join(uploadsFolder, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await this.prisma.product_image.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async getByVariantId(variantId: number): Promise<ProductImageDTO[]> {
    const list = await this.prisma.product_image.findMany({
      where: { variant_id: variantId },
    });
    return list.map((e) => {
      const dto = new ProductImageDTO();
      dto.id = e.id;
      dto.product_id = e.product_id;
      dto.variant_id = variantId;
      dto.url = e.url;
      return dto;
    });
  }
}
