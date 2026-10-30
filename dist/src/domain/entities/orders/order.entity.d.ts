export interface OrderUserEntity {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: number;
}
export interface OrderEntity {
    id: number;
    user_id: number;
    discount: number;
    total: number;
    address_id?: number;
    status: number;
    created_at?: Date | null;
    user?: OrderUserEntity | null;
}
export interface OrderDetailEntity {
    id: number;
    order_id: number;
    variant_id: number;
    quantity: number;
}
