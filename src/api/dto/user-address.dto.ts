export class UserAddressDTO {
  id: number = 0;
  user_id: number = 0;
  full_name: string = '';
  phone: string = '';
  province_id: number = 0;
  district_id: number = 0;
  ward_id: number = 0;
  address_detail: string = '';
  address_type: number = 1;
  is_default: boolean = false;
  status: number = 1;
  created_at?: Date;
  updated_at?: Date;
}
