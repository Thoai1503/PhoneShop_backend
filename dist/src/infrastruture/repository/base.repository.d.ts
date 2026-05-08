import { PrismaService } from '../database/prisma.service';
export declare class BaseRepository<T> {
    protected readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
}
