export interface UserAddressEntity {
  id: number;
  user_id: number;
  full_name: string;
  phone: string;
  province_id: number;
  district_id: number;
  ward_id: number;
  address_detail: string;
  address_type: number;
  is_default: boolean;
  status: number;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export type UserAddressWithRelationsEntity = UserAddressEntity & {
  users: unknown;
  provinces: unknown;
  districts: unknown;
  wards: unknown;
};

export interface UserAccountEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: number;
  status: number;
  is_verified: number;
}

export interface TokenPairEntity {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}
