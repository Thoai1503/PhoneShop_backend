export class OrderUserDTO {
  id: number = 0;
  name: string = '';
  email: string = '';
  phone: string = '';
  status: number = 0;
}

export class OrderDTO {
  id: number = 0;
  user_id: number = 0;
  discount: number = 0;
  total: number = 0;
  address_id?: number;
  status: number = 1;
  created_at?: Date;
  user?: OrderUserDTO | null = null;
}
