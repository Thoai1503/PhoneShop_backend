import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository.js';
import { PrismaService } from '../database/prisma.service.js';
import UserDTO from '../../api/dto/user.dto.js';

@Injectable()
export class UsersRepository extends BaseRepository {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prismaService.users.findFirst({
      where: { email },
    });
    if (!user) return null;
    return new UserDTO({
      id: user?.id,
      email: user?.email,
      password: user?.password,
      role: user?.role,
      status: user?.status,
      phone: user?.phone,
      name: user?.full_name,
    });
  }

  async createUser(user: UserDTO): Promise<UserDTO> {
    const created = await this.prismaService.users.create({
      data: {
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        status: user.getStatus(),
        phone: user.getPhone(),
        full_name: user.getName(),
      },
    });
    return new UserDTO({
      id: created.id,
      email: created.email,
      password: created.password,
      role: created.role,
      status: created.status,
      phone: created.phone,
      name: created.full_name,
    });
  }
  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
    });
    if (!user) return null;
    return new UserDTO({
      id: user?.id,
      email: user?.email,
      password: user?.password,
      role: user?.role,
      status: user?.status,
      phone: user?.phone,
      name: user?.full_name,
    });
  }
}
