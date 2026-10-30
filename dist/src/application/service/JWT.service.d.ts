import type { IJWTService } from '../../domain/services/iauth.service.js';
import type { TokenPairEntity } from '../../domain/entities/users/user.entity.js';
export default class JWTService implements IJWTService {
    private accessTokenSecret;
    private refreshTokenSecret;
    private accessTokenExpiry;
    private refreshTokenExpiry;
    constructor();
    generateAccessToken(payload: any): any;
    generateRefreshToken(payload: any): any;
    generateTokens(payload: any): TokenPairEntity;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
    decodeToken(token: string): any;
    getTokenExpiryTime(expiryString: string): number;
    generatePasswordResetToken(): string;
    generateEmailVerificationToken(payload: any): any;
    isTokenExpired(token: string): boolean;
    getTokenPayload(token: string): any;
}
