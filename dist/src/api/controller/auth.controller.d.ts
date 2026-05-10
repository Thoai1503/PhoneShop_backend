import { LoginDTO } from '../dto/login.dto.js';
import { AuthService } from '../../application/service/auth.service.js';
import type { NextFunction, Response } from 'express';
import { RegisterDTO } from '../dto/register.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDTO, res: Response): Promise<Response>;
    register(body: RegisterDTO, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    refreshToken(res: Response, body: {
        refreshToken?: string;
    }): Promise<Response<any, Record<string, any>> | undefined>;
}
