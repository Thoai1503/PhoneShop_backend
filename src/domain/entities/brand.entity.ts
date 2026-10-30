export interface BrandEntity {
  id: number;
  name: string;
  slug: string;
  status: number;
}

export interface CreateBrandInput {
  name: string;
  slug: string;
  status: number;
}
