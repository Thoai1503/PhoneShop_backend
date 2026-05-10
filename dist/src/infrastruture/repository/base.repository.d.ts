import { PrismaService } from '../database/prisma.service.js';
export declare abstract class BaseRepository {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
}
