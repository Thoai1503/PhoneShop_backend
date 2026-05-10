import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { ProvinceDTO } from '../../api/dto/province.dto.js';

@Injectable()
export class ProvinceRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(): Promise<ProvinceDTO[]> {
    const list = await this.prisma.provinces.findMany();
    return list.map((item) => {
      const dto = new ProvinceDTO();
      dto.id = item.id;
      dto.name = item.name;
      dto.code = item.code;
      dto.status = item.status;
      return dto;
    });
  }
}
