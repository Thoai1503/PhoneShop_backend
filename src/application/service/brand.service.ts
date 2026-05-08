import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../../infrastruture/repository/brand.repository.js';
import { BrandDTO } from '../../api/dto/brand.dto.js';

@Injectable()
export class BrandService {
  constructor(private readonly repo: BrandRepository) {}

  async getAll(): Promise<BrandDTO[]> {
    return this.repo.getAll();
  }
}
