import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import type { WardEntity } from '../../domain/entities/ward.entity.js';
import type { IWardRepository } from '../../domain/repositories/iward.repository.js';

@Injectable()
export class WardRepository implements IWardRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findByDistrictId(districtId: number): Promise<WardEntity[]> {
    const list = await this.prisma.wards.findMany({
      where: { district_id: districtId },
    });
    return list.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      district_id: item.district_id,
      status: item.status,
    }));
  }
}
