import { Inject, Injectable } from '@nestjs/common';
import type { DistrictEntity } from '../../domain/entities/district.entity.js';
import {
  DISTRICT_REPOSITORY,
  type IDistrictRepository,
} from '../../domain/repositories/idistrict.repository.js';
import type { IDistrictService } from '../../domain/services/idistrict.service.js';

@Injectable()
export class DistrictService implements IDistrictService {
  constructor(
    @Inject(DISTRICT_REPOSITORY)
    private readonly repo: IDistrictRepository,
  ) {}

  async getByProvinceId(provinceId: number): Promise<DistrictEntity[]> {
    return this.repo.findByProvinceId(provinceId);
  }
}
