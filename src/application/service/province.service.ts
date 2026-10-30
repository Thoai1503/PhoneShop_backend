import { Inject, Injectable } from '@nestjs/common';
import type { ProvinceEntity } from '../../domain/entities/province.entity.js';
import {
  PROVINCE_REPOSITORY,
  type IProvinceRepository,
} from '../../domain/repositories/iprovince.repository.js';
import type { IProvinceService } from '../../domain/services/iprovince.service.js';

@Injectable()
export class ProvinceService implements IProvinceService {
  constructor(
    @Inject(PROVINCE_REPOSITORY)
    private readonly repo: IProvinceRepository,
  ) {}

  async findAll(): Promise<ProvinceEntity[]> {
    return this.repo.findAll();
  }
}
