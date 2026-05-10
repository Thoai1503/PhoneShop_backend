import { Injectable } from '@nestjs/common';
import { ProvinceRepository } from '../../infrastruture/repository/province.repository.js';
import { ProvinceDTO } from '../../api/dto/province.dto.js';

@Injectable()
export class ProvinceService {
  constructor(private readonly repo: ProvinceRepository) {}

  async findAll(): Promise<ProvinceDTO[]> {
    return this.repo.findAll();
  }
}
