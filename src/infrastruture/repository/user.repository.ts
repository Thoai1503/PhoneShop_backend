import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import type { IUsersRepository } from '../../domain/repositories/iuser.repository.js';
import type { UserAccountEntity } from '../../domain/entities/users/user.entity.js';

@Injectable()
export class UsersRepository
  extends BaseRepository
  implements IUsersRepository
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findByEmail(email: string): Promise<UserAccountEntity | null> {
    const user = await this.prismaService.users.findFirst({
      where: { email },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      phone: user.phone,
      name: user.full_name,
      is_verified: user.is_verified,
    };
  }

  async createUser(user: UserAccountEntity): Promise<UserAccountEntity> {
    const created = await this.prismaService.users.create({
      data: {
        email: user.email,
        password: user.password,
        role: 2,
        status: user.status,
        phone: user.phone,
        is_verified: user.is_verified,
        full_name: user.name,
      },
    });
    return {
      id: created.id,
      email: created.email,
      password: created.password,
      role: created.role,
      status: created.status,
      phone: created.phone,
      name: created.full_name,
      is_verified: created.is_verified,
    };
  }
  async getUserById(id: number): Promise<UserAccountEntity | null> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      phone: user.phone,
      name: user.full_name,
      is_verified: user.is_verified,
    };
  }

  async markUserAsVerified(id: number): Promise<void> {
    await this.prismaService.users.update({
      where: { id },
      data: {
        is_verified: 1,
        status: 1,
      },
    });
  }
}
