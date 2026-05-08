export declare class CategoryDTO {
    id?: number;
    name: string;
    slug: string;
    parent_id?: number | null;
    path: string;
    level?: number;
    created_at?: Date;
    category_attributes?: any[];
}
