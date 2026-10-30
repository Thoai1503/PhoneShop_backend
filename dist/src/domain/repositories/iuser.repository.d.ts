import type { UserAddressEntity, UserAddressWithRelationsEntity, UserAccountEntity } from '../entities/users/user.entity.js';
export interface IUserAddressRepository {
    create(item: UserAddressEntity): Promise<number>;
    findByUserId(userId: number): Promise<UserAddressWithRelationsEntity[]>;
    update(id: number, item: UserAddressEntity): Promise<boolean>;
}
export declare const USER_ADDRESS_REPOSITORY: unique symbol;
export interface IUsersRepository {
    findByEmail(email: string): Promise<UserAccountEntity | null>;
    createUser(user: UserAccountEntity): Promise<UserAccountEntity>;
    getUserById(id: number): Promise<UserAccountEntity | null>;
    markUserAsVerified(id: number): Promise<void>;
}
export declare const USERS_REPOSITORY: unique symbol;
