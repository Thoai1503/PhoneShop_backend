import { Injectable } from '@nestjs/common';
import { WardRepository } from '../../infrastruture/repository/ward.repository.js';
import { WardDTO } from '../../api/dto/ward.dto.js';

@Injectable()
export class WardService {
  constructor(private readonly repo: WardRepository) {}

  async getByDistrictId(districtId: number): Promise<WardDTO[]> {
    return this.repo.getByDistrictId(districtId);
  }
}
