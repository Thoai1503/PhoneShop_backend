export declare class RegisterDTO {
    name: string;
    email: string;
    phone: string;
    password: string;
    repeated_password?: string;
    role: number;
    status: number;
    constructor(name: string, email: string, phone: string, password: string, role?: number, status?: number);
}
