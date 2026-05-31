import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import JWTService from '../application/service/JWT.service.js';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JWTService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    private extractTokenFromHeader;
}
