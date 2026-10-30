import type {
  UserAddressEntity,
  UserAddressWithRelationsEntity,
} from '../entities/users/user.entity.js';

export interface IUserAddressService {
  create(item: UserAddressEntity): Promise<number>;
  findByUserId(userId: number): Promise<UserAddressWithRelationsEntity[]>;
  update(id: number, item: UserAddressEntity): Promise<boolean>;
}
