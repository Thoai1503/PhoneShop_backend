import { Injectable } from '@nestjs/common';
import { BrandRepository } from 'src/infrastruture/repository/brand.repository';
import { BrandDTO } from '../../api/dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly repo: BrandRepository) {}

  async getAll(): Promise<BrandDTO[]> {
    return this.repo.getAll();
  }
}
