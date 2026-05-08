import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AttributeService } from 'src/application/service/attribute.service';
import { AttributeDTO } from '../dto/attribute.dto';

@Controller('api/attribute')
export class AttributeController {
  constructor(private readonly service: AttributeService) {}

  // GET api/attribute
  @Get()
  async getAll(): Promise<AttributeDTO[]> {
    return this.service.getAll();
  }

  // GET api/attribute/GetByCategoryId/:categoryId
  @Get('GetByCategoryId/:categoryId')
  async getByCategoryId(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<AttributeDTO[]> {
    return this.service.getByCategoryId(categoryId);
  }

  // POST api/attribute
  @Post()
  async create(@Body() entity: AttributeDTO): Promise<boolean> {
    return this.service.create(entity);
  }
}
