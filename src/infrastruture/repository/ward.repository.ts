import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { WardDTO } from '../../api/dto/ward.dto.js';

@Injectable()
export class WardRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getByDistrictId(districtId: number): Promise<WardDTO[]> {
    const list = await this.prisma.wards.findMany({
      where: { district_id: districtId },
    });
    return list.map((item) => {
      const dto = new WardDTO();
      dto.id = item.id;
      dto.name = item.name;
      dto.code = item.code;
      dto.district_id = item.district_id;
      dto.status = item.status;
      return dto;
    });
  }
}
