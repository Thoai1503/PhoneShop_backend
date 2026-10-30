export interface IAuthService<TResponse, TNext, TUserInput> {
    refreshToken(req: {
        refreshToken?: string;
    }, res: TResponse, next: TNext): Promise<unknown>;
    validateUser(email: string, password: string, res: TResponse): Promise<TUserInput | TResponse>;
    sendTokenResponse(user: TUserInput, statusCode: number, res: TResponse): TResponse;
    verifyEmailToken(token: string | undefined, res: TResponse): Promise<TResponse>;
    register(req: TUserInput, res: TResponse, next: TNext): Promise<unknown>;
    logout(res: TResponse): Promise<TResponse>;
}
export interface IJWTService {
    generateAccessToken(payload: Record<string, unknown>): string;
    generateRefreshToken(payload: Record<string, unknown>): string;
    generateTokens(payload: Record<string, unknown>): {
        accessToken: string;
        refreshToken?: string;
        expiresIn?: number;
    };
    verifyAccessToken(token: string): unknown;
    verifyRefreshToken(token: string): unknown;
    decodeToken(token: string): unknown;
    getTokenExpiryTime(expiryString: string): number;
    generatePasswordResetToken(): string;
    generateEmailVerificationToken(payload: Record<string, unknown>): string;
    isTokenExpired(token: string): boolean;
    getTokenPayload(token: string): unknown;
}
export interface IPasswordService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    validatePassword(password: string): {
        isValid: boolean;
        errors: string[];
    };
    generateSecurePassword(length?: number): string;
    getPasswordStrength(password: string): number;
    getPasswordStrengthDescription(score: number): {
        level: string;
        color: string;
    };
}
