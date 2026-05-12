import UserDTO from '../../api/dto/user.dto.js';
import { UsersRepository } from '../../infrastruture/repository/user.repository.js';
import { NextFunction, Response } from 'express';
import PasswordService from './password.service.js';
import JWTService from './JWT.service.js';
import { MailService } from '../../service/mail.service.js';
export declare class AuthService {
    private readonly userRepo;
    private readonly passwordService;
    private readonly jwtService;
    private readonly mailService;
    constructor(userRepo: UsersRepository, passwordService: PasswordService, jwtService: JWTService, mailService: MailService);
    refreshToken: (req: {
        refreshToken?: string;
    }, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    validateUser(email: string, password: string, res: Response): Promise<UserDTO | Response>;
    sendTokenResponse: (user: UserDTO, statusCode: number, res: Response) => Response<any, Record<string, any>>;
    verifyEmailToken: (token: string | undefined, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: UserDTO, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    logout: (res: Response) => Promise<Response>;
}
