import type {
  OrderDetailEntity,
  OrderEntity,
} from '../entities/orders/order.entity.js';

export interface IOrderDetailRepository {
  findByOrderId(orderId: number): Promise<OrderDetailEntity[]>;
}
export const ORDER_DETAIL_REPOSITORY = Symbol('ORDER_DETAIL_REPOSITORY');

export interface IOrderRepository {
  findAll(): Promise<OrderEntity[]>;
  findById(id: number): Promise<OrderEntity | null>;
  getByUserId(userId: number): Promise<OrderEntity[]>;
}
export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');
