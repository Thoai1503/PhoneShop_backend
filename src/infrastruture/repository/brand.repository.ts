import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { BrandDTO } from '../../api/dto/brand.dto.js';

@Injectable()
export class BrandRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getAll(): Promise<BrandDTO[]> {
    const list = await this.prisma.brands.findMany();
    return list.map((b) => this.toDTO(b));
  }

  private toDTO(b: any): BrandDTO {
    const dto = new BrandDTO();
    dto.id = b.id;
    dto.name = b.name;
    dto.slug = b.slug;
    dto.status = b.status;
    return dto;
  }
}
