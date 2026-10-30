import { Inject, Injectable } from '@nestjs/common';
import type { WardEntity } from '../../domain/entities/ward.entity.js';
import {
  WARD_REPOSITORY,
  type IWardRepository,
} from '../../domain/repositories/iward.repository.js';
import type { IWardService } from '../../domain/services/iward.service.js';

@Injectable()
export class WardService implements IWardService {
  constructor(
    @Inject(WARD_REPOSITORY)
    private readonly repo: IWardRepository,
  ) {}

  async getByDistrictId(districtId: number): Promise<WardEntity[]> {
    return this.repo.findByDistrictId(districtId);
  }
}
