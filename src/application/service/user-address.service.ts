import { Inject, Injectable } from '@nestjs/common';
import {
  USER_ADDRESS_REPOSITORY,
  type IUserAddressRepository,
} from '../../domain/repositories/iuser.repository.js';
import type { IUserAddressService } from '../../domain/services/iuser.service.js';
import type {
  UserAddressEntity,
  UserAddressWithRelationsEntity,
} from '../../domain/entities/users/user.entity.js';

@Injectable()
export class UserAddressService implements IUserAddressService {
  constructor(
    @Inject(USER_ADDRESS_REPOSITORY)
    private readonly repo: IUserAddressRepository,
  ) {}

  async create(item: UserAddressEntity): Promise<number> {
    return this.repo.create(item);
  }

  async findByUserId(
    userId: number,
  ): Promise<UserAddressWithRelationsEntity[]> {
    return this.repo.findByUserId(userId);
  }

  async update(id: number, item: UserAddressEntity): Promise<boolean> {
    return this.repo.update(id, item);
  }
}
