import { type IOrderRepository } from '../../domain/repositories/iorder.repository.js';
import type { IOrderService } from '../../domain/services/iorder.service.js';
import type { OrderEntity } from '../../domain/entities/orders/order.entity.js';
export declare class OrderService implements IOrderService {
    private readonly repo;
    constructor(repo: IOrderRepository);
    findAll(): Promise<OrderEntity[]>;
    getByUserId(userId: number): Promise<OrderEntity[]>;
    findById(id: number): Promise<OrderEntity | null>;
}
