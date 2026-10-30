import { PrismaService } from '../database/prisma.service.js';
import type { IOrderRepository } from '../../domain/repositories/iorder.repository.js';
import type { OrderEntity } from '../../domain/entities/orders/order.entity.js';
export declare class OrderRepository implements IOrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<OrderEntity[]>;
    findById(id: number): Promise<OrderEntity | null>;
    getByUserId(userId: number): Promise<OrderEntity[]>;
}
