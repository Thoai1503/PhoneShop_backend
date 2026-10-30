import { Inject, Injectable } from '@nestjs/common';
import type {
  BrandEntity,
  CreateBrandInput,
} from '../../domain/entities/brand.entity.js';
import {
  BRAND_REPOSITORY,
  type IBrandRepository,
} from '../../domain/repositories/ibrand.repository.js';
import type { IBrandService } from '../../domain/services/ibrand.service.js';

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly repo: IBrandRepository,
  ) {}

  async create(brand: CreateBrandInput): Promise<BrandEntity> {
    return this.repo.create(brand);
  }

  async getAll(): Promise<BrandEntity[]> {
    return this.repo.findAll();
  }
}
