import { PrismaService } from '../database/prisma.service.js';
import { OrderDetailDTO } from '../../api/dto/order-detail.dto.js';
export declare class OrderDetailRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByOrderId(orderId: number): Promise<OrderDetailDTO[]>;
}
