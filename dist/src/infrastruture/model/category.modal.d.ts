import { BaseModel } from './base.modal';
export declare class Category implements BaseModel {
    id?: string;
    name: string;
    slug: string;
    parentId?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    constructor(category: Category);
}
