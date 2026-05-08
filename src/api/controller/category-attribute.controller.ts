import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  BadRequestException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryAttributeService } from 'src/application/service/category-attribute.service';
import { CategoryAttributeDTO, CategoryAttributeUpdateStateDTO } from '../dto/category-attribute.dto';

@Controller('api/categoryattribute')
export class CategoryAttributeController {
  constructor(private readonly service: CategoryAttributeService) {}

  // GET api/categoryattribute
  @Get()
  async getAll(): Promise<CategoryAttributeDTO[]> {
    return this.service.getAll();
  }

  // GET api/categoryattribute/category/:category
  @Get('category/:category')
  async getByCategory(@Param('category') category: string): Promise<CategoryAttributeDTO[]> {
    return this.service.getByCategory(category);
  }

  // POST api/categoryattribute
  @Post()
  async create(@Body() entity: CategoryAttributeDTO): Promise<boolean> {
    const result = await this.service.create(entity);
    if (!result) throw new BadRequestException();
    return result;
  }

  // PUT api/categoryattribute/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: CategoryAttributeUpdateStateDTO,
  ): Promise<CategoryAttributeDTO> {
    const result = await this.service.update(id, entity);
    if (!result.success) throw new NotFoundException({ success: false, message: 'Category attribute not found or update failed' });
    return result.entity!;
  }

  // DELETE api/categoryattribute/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.delete(id);
  }

  // POST api/categoryattribute/category/:categoryId
  @Post('category/:categoryId')
  async createMultipleAttr(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() ints: number[],
  ): Promise<boolean | object> {
    const result = await this.service.createMultiple(categoryId, ints);
    if (!result.success) return { success: false, id: result.failedId };
    return true;
  }
}
