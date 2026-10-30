import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { DistrictEntity } from '../../domain/entities/district.entity.js';
import type { IDistrictRepository } from '../../domain/repositories/idistrict.repository.js';

@Injectable()
export class DistrictRepository implements IDistrictRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByProvinceId(provinceId: number): Promise<DistrictEntity[]> {
    const list = await this.prisma.districts.findMany({
      where: { province_id: provinceId },
    });
    return list.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      province_id: item.province_id,
      status: item.status,
    }));
  }
}
