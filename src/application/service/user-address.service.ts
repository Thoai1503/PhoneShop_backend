import { Injectable } from '@nestjs/common';
import { UserAddressRepository } from '../../infrastruture/repository/user-address.repository.js';
import { UserAddressDTO } from '../../api/dto/user-address.dto.js';

@Injectable()
export class UserAddressService {
  constructor(private readonly repo: UserAddressRepository) {}

  async create(item: UserAddressDTO): Promise<number> {
    return this.repo.create(item);
  }

  async findByUserId(userId: number): Promise<any[]> {
    return this.repo.findByUserId(userId);
  }

  async update(id: number, item: UserAddressDTO): Promise<boolean> {
    return this.repo.update(id, item);
  }
}
