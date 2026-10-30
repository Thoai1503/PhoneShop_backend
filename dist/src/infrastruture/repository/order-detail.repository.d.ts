import { PrismaService } from '../database/prisma.service.js';
import type { IOrderDetailRepository } from '../../domain/repositories/iorder.repository.js';
import type { OrderDetailEntity } from '../../domain/entities/orders/order.entity.js';
export declare class OrderDetailRepository implements IOrderDetailRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByOrderId(orderId: number): Promise<OrderDetailEntity[]>;
}
