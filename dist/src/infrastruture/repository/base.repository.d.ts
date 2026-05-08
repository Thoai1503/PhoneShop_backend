import { PrismaService } from '../database/prisma.service.js';
export declare class BaseRepository<T> {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
}
