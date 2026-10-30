import type { OrderDetailEntity, OrderEntity } from '../entities/orders/order.entity.js';
export interface IOrderDetailService {
    findByOrderId(orderId: number): Promise<OrderDetailEntity[]>;
}
export interface IOrderService {
    findAll(): Promise<OrderEntity[]>;
    getByUserId(userId: number): Promise<OrderEntity[]>;
    findById(id: number): Promise<OrderEntity | null>;
}
