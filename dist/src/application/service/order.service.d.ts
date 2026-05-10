import { OrderRepository } from '../../infrastruture/repository/order.repository.js';
import { OrderDTO } from '../../api/dto/order.dto.js';
export declare class OrderService {
    private readonly repo;
    constructor(repo: OrderRepository);
    findAll(): Promise<OrderDTO[]>;
    getByUserId(userId: number): Promise<OrderDTO[]>;
    findById(id: number): Promise<OrderDTO | null>;
}
