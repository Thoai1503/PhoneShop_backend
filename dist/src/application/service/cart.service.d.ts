import { CartRepository } from '../../infrastruture/repository/cart.repository';
import { CartDTO } from '../../api/dto/product.dto';
export declare class CartService {
    private readonly repo;
    constructor(repo: CartRepository);
    findByUserId(userId: number): Promise<CartDTO[]>;
}
