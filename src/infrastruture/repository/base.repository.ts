import { PrismaService } from '../database/prisma.service.js';
import { IBaseRepository } from './ibase.repository.js';

export abstract class BaseRepository {
  constructor(protected readonly prismaService: PrismaService) {}
}
