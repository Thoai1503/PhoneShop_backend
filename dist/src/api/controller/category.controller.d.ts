import { CategoryService } from '../../application/service/category.service.js';
import { CategoryDTO } from '../dto/category.dto.js';
import type { Request, Response } from 'express';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    private toSlug;
    getAll(req: Request, res: Response): Promise<Response>;
    getBySlug(slug: string): string;
    getById(id: number): Promise<CategoryDTO>;
    create(req: Request, body: {
        name?: string;
        parent_id?: number;
    }, res: Response): Promise<Response>;
    update(req: Request, id: number, body: {
        name?: string;
        parent_id?: number;
    }, res: Response): Promise<Response>;
    delete(req: Request, id: number, res: Response): Promise<Response>;
}
