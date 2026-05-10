import { TokenPair } from 'src/api/dto/user.dto.js';
export default class JWTService {
    private accessTokenSecret;
    private refreshTokenSecret;
    private accessTokenExpiry;
    private refreshTokenExpiry;
    constructor();
    generateAccessToken(payload: any): any;
    generateRefreshToken(payload: any): any;
    generateTokens(payload: any): TokenPair;
    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
    decodeToken(token: string): any;
    getTokenExpiryTime(expiryString: string): number;
    generatePasswordResetToken(): string;
    generateEmailVerificationToken(payload: any): any;
    isTokenExpired(token: string): boolean;
    getTokenPayload(token: string): any;
}
