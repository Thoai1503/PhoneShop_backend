import { PrismaService } from '../database/prisma.service.js';

export abstract class BaseRepository {
  constructor(protected readonly prismaService: PrismaService) {}
}
