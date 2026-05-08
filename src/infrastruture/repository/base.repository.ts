import { PrismaService } from '../database/prisma.service.js';
import { IBaseRepository } from './ibase.repository.js';

export class BaseRepository<T> {
  constructor(protected readonly prismaService: PrismaService) {}
}
