import { PrismaService } from '../database/prisma.service.js';
import { OrderDTO } from '../../api/dto/order.dto.js';
export declare class OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<OrderDTO[]>;
    findById(id: number): Promise<OrderDTO | null>;
    getByUserId(userId: number): Promise<OrderDTO[]>;
}
