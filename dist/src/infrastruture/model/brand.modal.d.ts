import { BaseModel } from './base.modal.js';
export default class Brand implements BaseModel {
    id?: string;
    name: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    constructor(brand: Brand);
}
