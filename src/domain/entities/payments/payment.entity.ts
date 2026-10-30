export interface PaymentRequestEntity {
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

export interface PaymentCartItemEntity {
  variant_id: number;
  quantity: number;
  unit_price: unknown;
}

export interface CreateOrderFromCartEntity {
  userId: number;
  amount: number;
  addressId?: number | null;
}

export interface CreatedOrderEntity {
  orderId: number;
  cartCount: number;
}

export interface PendingOrderEntity {
  id: number;
}
