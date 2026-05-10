import type { Request, Response } from 'express';
import { UserAddressService } from '../../application/service/user-address.service.js';
import { UserAddressDTO } from '../dto/user-address.dto.js';
export declare class UserAddressController {
    private readonly service;
    constructor(service: UserAddressService);
    createNewAddress(req: Request, body: Omit<UserAddressDTO, 'id'>, res: Response): Promise<Response>;
    findByUserId(req: Request, userId: number, res: Response): Promise<Response>;
    updateAddress(req: Request, id: number, body: UserAddressDTO, res: Response): Promise<Response>;
}
