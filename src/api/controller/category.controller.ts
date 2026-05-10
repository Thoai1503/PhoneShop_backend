import {
  Body,
  HttpStatus,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CategoryService } from '../../application/service/category.service.js';
import { CategoryDTO } from '../dto/category.dto.js';
import type { Request, Response } from 'express';
import {
  respondError,
  respondSuccess,
} from '../../common/http/response.util.js';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private toSlug(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // GET api/category
  @Get()
  async getAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.categoryService.getAll();
    return respondSuccess(req, res, 200, list);
  }

  // GET api/category/slug/:slug
  @Get('slug/:slug')
  getBySlug(@Param('slug') slug: string): string {
    return `Category with slug: ${slug}`;
  }

  // GET api/category/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CategoryDTO> {
    const result = await this.categoryService.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  // POST api/category
  @Post()
  async create(
    @Req() req: Request,
    @Body() body: { name?: string; parent_id?: number },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const { name, parent_id } = body;
      if (!name) {
        return respondError(
          req,
          res,
          HttpStatus.BAD_REQUEST,
          { success: false, message: 'Name is required' },
          'Name is required',
        );
      }

      const cate = new CategoryDTO();
      cate.name = name;
      cate.parent_id = parent_id ?? null;
      cate.slug = this.toSlug(name);
      cate.path = '';
      cate.level = 0;

      const result = await this.categoryService.createCategory(cate);
      return respondSuccess(
        req,
        res,
        HttpStatus.CREATED,
        {
          success: true,
          data: result,
        },
        { message: 'Category created', data: result },
      );
    } catch (error: any) {
      console.error('Error creating category:', error);
      return respondError(
        req,
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          success: false,
          message: 'Internal Server Error',
          error: error?.message,
        },
        'Internal Server Error',
      );
    }
  }

  // POST api/category/:id  (update)
  @Post(':id')
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; parent_id?: number },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const cate = new CategoryDTO();
    cate.name = body.name ?? '';
    cate.parent_id = body.parent_id ?? null;

    if (body.name) {
      cate.slug = this.toSlug(body.name);
    } else {
      (cate as any).slug = undefined;
    }

    (cate as any).path = undefined;
    (cate as any).level = undefined;

    const result = await this.categoryService.updateCategory(id, cate);
    if (!result) {
      return respondError(
        req,
        res,
        HttpStatus.NOT_FOUND,
        {
          success: false,
          message: "Can't update or not found the result",
        },
        "Can't update or not found the result",
      );
    }

    return respondSuccess(
      req,
      res,
      HttpStatus.CREATED,
      {
        success: true,
        message: 'Update successfully!',
      },
      { message: 'Update successfully!', data: result },
    );
  }

  // DELETE api/category/:id
  @Delete(':id')
  async delete(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const result = await this.categoryService.deleteCategory(id);
    return respondSuccess(req, res, 200, result, {
      message: result ? 'Deleted' : 'Not deleted',
      data: result,
    });
  }
}
