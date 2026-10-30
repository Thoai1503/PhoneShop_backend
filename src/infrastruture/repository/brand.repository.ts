import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type {
  BrandEntity,
  CreateBrandInput,
} from '../../domain/entities/brand.entity.js';
import type { IBrandRepository } from '../../domain/repositories/ibrand.repository.js';
import { BaseRepository } from './base.repository.js';

@Injectable()
export class BrandRepository
  extends BaseRepository
  implements IBrandRepository
{
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {
    super(prisma);
  }

  async create(item: CreateBrandInput): Promise<BrandEntity> {
    const created = await this.prisma.brands.create({
      data: {
        name: item.name,
        slug: item.slug,
        status: item.status,
      },
    });
    return this.toEntity(created);
  }

  async findById(id: number): Promise<BrandEntity | null> {
    const brand = await this.prisma.brands.findUnique({ where: { id } });
    return brand ? this.toEntity(brand) : null;
  }

  async findAll(): Promise<BrandEntity[]> {
    const brands = await this.prisma.brands.findMany();
    return brands.map((brand) => this.toEntity(brand));
  }

  async update(
    id: number,
    input: Partial<CreateBrandInput>,
  ): Promise<BrandEntity | null> {
    const existing = await this.prisma.brands.findUnique({ where: { id } });
    if (!existing) return null;

    const updated = await this.prisma.brands.update({
      where: { id },
      data: input,
    });
    return this.toEntity(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.prisma.brands.deleteMany({ where: { id } });
    return result.count > 0;
  }

  private toEntity(brand: {
    id: number;
    name: string;
    slug: string;
    status: number;
  }): BrandEntity {
    return {
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      status: brand.status,
    };
  }
}
