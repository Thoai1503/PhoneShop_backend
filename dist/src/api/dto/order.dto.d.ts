export declare class OrderUserDTO {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: number;
}
export declare class OrderDTO {
    id: number;
    user_id: number;
    discount: number;
    total: number;
    address_id?: number;
    status: number;
    created_at?: Date;
    user?: OrderUserDTO | null;
}
