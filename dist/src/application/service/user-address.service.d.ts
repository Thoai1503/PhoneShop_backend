import { type IUserAddressRepository } from '../../domain/repositories/iuser.repository.js';
import type { IUserAddressService } from '../../domain/services/iuser.service.js';
import type { UserAddressEntity, UserAddressWithRelationsEntity } from '../../domain/entities/users/user.entity.js';
export declare class UserAddressService implements IUserAddressService {
    private readonly repo;
    constructor(repo: IUserAddressRepository);
    create(item: UserAddressEntity): Promise<number>;
    findByUserId(userId: number): Promise<UserAddressWithRelationsEntity[]>;
    update(id: number, item: UserAddressEntity): Promise<boolean>;
}
