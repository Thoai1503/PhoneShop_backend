import { OrderDetailRepository } from '../../infrastruture/repository/order-detail.repository.js';
import { OrderDetailDTO } from '../../api/dto/order-detail.dto.js';
export declare class OrderDetailService {
    private readonly repo;
    constructor(repo: OrderDetailRepository);
    findByOrderId(orderId: number): Promise<OrderDetailDTO[]>;
}
