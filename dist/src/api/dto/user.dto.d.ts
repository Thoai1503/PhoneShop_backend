export interface TokenPair {
    accessToken: string;
    refreshToken?: string;
    [key: string]: any;
}
export interface JwtPayload {
    id: number;
    email: string;
    role: number;
    status: number;
    [key: string]: any;
}
export interface UserData {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    role: number;
    status: number;
}
export default class UserDTO {
    private id;
    private name;
    private email;
    private phone;
    private password;
    private role;
    private status;
    private jwtService;
    static USER_TABLE: string;
    constructor(data?: UserData);
    getId(): number;
    getName(): string;
    getEmail(): string;
    getPhone(): string;
    getPassword(): string;
    getRole(): number;
    getStatus(): number;
    setStatus(status: number): void;
    static validate(payload: {
        name?: string;
        email?: string;
        password?: string;
        role?: number;
        status?: number;
    }): {
        valid: boolean;
        errors: Record<string, string>;
    };
    hashPassword(): Promise<void>;
    comparePassword(plain: string): Promise<boolean>;
    generateAuthToken(): TokenPair;
}
