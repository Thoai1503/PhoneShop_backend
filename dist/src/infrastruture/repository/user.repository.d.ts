import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import UserDTO from '../../api/dto/user.dto.js';
export declare class UsersRepository extends BaseRepository {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    findByEmail(email: string): Promise<UserDTO | null>;
    createUser(user: UserDTO): Promise<UserDTO>;
    getUserById(id: number): Promise<UserDTO | null>;
}
