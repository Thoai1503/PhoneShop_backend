import { UserAddressRepository } from '../../infrastruture/repository/user-address.repository.js';
import { UserAddressDTO } from '../../api/dto/user-address.dto.js';
export declare class UserAddressService {
    private readonly repo;
    constructor(repo: UserAddressRepository);
    create(item: UserAddressDTO): Promise<number>;
    findByUserId(userId: number): Promise<any[]>;
    update(id: number, item: UserAddressDTO): Promise<boolean>;
}
