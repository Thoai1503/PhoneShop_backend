import { PrismaService } from '../database/prisma.service.js';
import type { IUserAddressRepository } from '../../domain/repositories/iuser.repository.js';
import type { UserAddressEntity, UserAddressWithRelationsEntity } from '../../domain/entities/users/user.entity.js';
export declare class UserAddressRepository implements IUserAddressRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: UserAddressEntity): Promise<number>;
    update(id: number, item: UserAddressEntity): Promise<boolean>;
    findByUserId(userId: number): Promise<UserAddressWithRelationsEntity[]>;
}
