import type { IPasswordService } from '../../domain/services/iauth.service.js';
export default class PasswordService implements IPasswordService {
    private saltRounds;
    private minLength;
    private requireUppercase;
    private requireLowercase;
    private requireNumbers;
    private requireSpecialChars;
    constructor();
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
