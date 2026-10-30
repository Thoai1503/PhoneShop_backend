import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import type { IUsersRepository } from '../../domain/repositories/iuser.repository.js';
import type { UserAccountEntity } from '../../domain/entities/users/user.entity.js';
export declare class UsersRepository extends BaseRepository implements IUsersRepository {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    findByEmail(email: string): Promise<UserAccountEntity | null>;
    createUser(user: UserAccountEntity): Promise<UserAccountEntity>;
    getUserById(id: number): Promise<UserAccountEntity | null>;
    markUserAsVerified(id: number): Promise<void>;
}
