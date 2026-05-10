import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { DistrictDTO } from '../../api/dto/district.dto.js';

@Injectable()
export class DistrictRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getByProvinceId(provinceId: number): Promise<DistrictDTO[]> {
    const list = await this.prisma.districts.findMany({
      where: { province_id: provinceId },
    });
    return list.map((item) => {
      const dto = new DistrictDTO();
      dto.id = item.id;
      dto.name = item.name;
      dto.code = item.code;
      dto.province_id = item.province_id;
      dto.status = item.status;
      return dto;
    });
  }
}
