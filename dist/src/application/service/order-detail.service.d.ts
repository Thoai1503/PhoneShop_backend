import { type IOrderDetailRepository } from '../../domain/repositories/iorder.repository.js';
import type { IOrderDetailService } from '../../domain/services/iorder.service.js';
import type { OrderDetailEntity } from '../../domain/entities/orders/order.entity.js';
export declare class OrderDetailService implements IOrderDetailService {
    private readonly repo;
    constructor(repo: IOrderDetailRepository);
    findByOrderId(orderId: number): Promise<OrderDetailEntity[]>;
}
