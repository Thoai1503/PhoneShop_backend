import { BaseModel } from './base.modal.js';

export class Category implements BaseModel {
  id?: string;
  name: string;
  slug: string;
  parentId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(category: Category) {
    this.name = category.name;
    this.slug = category.slug;
    this.parentId = category.parentId;
  }
}
