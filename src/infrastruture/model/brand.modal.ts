import { BaseModel } from './base.modal';

export default class Brand implements BaseModel {
  id?: string;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(brand: Brand) {
    this.name = brand.name;
    this.slug = brand.slug;
  }
}
