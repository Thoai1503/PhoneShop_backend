import type { OrderDetailEntity, OrderEntity } from '../entities/orders/order.entity.js';
export interface IOrderDetailRepository {
    findByOrderId(orderId: number): Promise<OrderDetailEntity[]>;
}
export declare const ORDER_DETAIL_REPOSITORY: unique symbol;
export interface IOrderRepository {
    findAll(): Promise<OrderEntity[]>;
    findById(id: number): Promise<OrderEntity | null>;
    getByUserId(userId: number): Promise<OrderEntity[]>;
}
export declare const ORDER_REPOSITORY: unique symbol;
