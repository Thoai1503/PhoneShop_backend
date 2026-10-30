import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { ProvinceEntity } from '../../domain/entities/province.entity.js';
import type { IProvinceRepository } from '../../domain/repositories/iprovince.repository.js';

@Injectable()
export class ProvinceRepository implements IProvinceRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProvinceEntity[]> {
    const list = await this.prisma.provinces.findMany();
    return list.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      status: item.status,
    }));
  }
}
