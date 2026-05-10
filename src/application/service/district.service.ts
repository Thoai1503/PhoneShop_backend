import { Injectable } from '@nestjs/common';
import { DistrictRepository } from '../../infrastruture/repository/district.repository.js';
import { DistrictDTO } from '../../api/dto/district.dto.js';

@Injectable()
export class DistrictService {
  constructor(private readonly repo: DistrictRepository) {}

  async getByProvinceId(provinceId: number): Promise<DistrictDTO[]> {
    return this.repo.getByProvinceId(provinceId);
  }
}
