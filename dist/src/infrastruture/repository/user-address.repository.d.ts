import { PrismaService } from '../database/prisma.service.js';
import { UserAddressDTO } from '../../api/dto/user-address.dto.js';
export declare class UserAddressRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(item: UserAddressDTO): Promise<number>;
    update(id: number, item: UserAddressDTO): Promise<boolean>;
    findByUserId(userId: number): Promise<any[]>;
}
