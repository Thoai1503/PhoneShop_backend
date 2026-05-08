import { PrismaService } from '../database/prisma.service';
import { IBaseRepository } from './ibase.repository';

export class BaseRepository<T> {
  constructor(protected readonly prismaService: PrismaService) {}
}
