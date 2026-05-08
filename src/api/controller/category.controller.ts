import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { CategoryService } from 'src/application/service/category.service';
import { CategoryDTO } from '../dto/category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // GET api/category
  @Get()
  async getAll(): Promise<CategoryDTO[]> {
    return this.categoryService.getAll();
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
  async create(@Body() cate: CategoryDTO): Promise<CategoryDTO> {
    const result = await this.categoryService.createCategory(cate);
    if (!result) throw new BadRequestException();
    return result;
  }

  // POST api/category/:id  (update)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cate: CategoryDTO,
  ): Promise<CategoryDTO> {
    const result = await this.categoryService.updateCategory(id, cate);
    if (!result) throw new NotFoundException();
    return result;
  }

  // DELETE api/category/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.categoryService.deleteCategory(id);
    if (!result) throw new NotFoundException();
    return result;
  }
}
