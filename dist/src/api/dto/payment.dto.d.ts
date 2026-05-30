export declare class PaymentRequestDTO {
    user_id: number;
    amount?: number;
    address_id?: number;
    orderId?: number;
    orderInfo?: string;
    bankCode?: string;
    orderType?: string;
    language?: string;
    requestType?: string;
    extraData?: string;
    lang?: string;
    metadata?: Record<string, unknown>;
}
