import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from '../../application/service/product.service.js';
import { ProductAddAndUpdateStateDTO, ProductDTO } from '../dto/product.dto.js';

@Controller('api/product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  // GET api/product
  @Get()
  async getAll(): Promise<ProductDTO[]> {
    return this.service.getAll();
  }

  // GET api/product/:id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ProductDTO> {
    const result = await this.service.findById(id);
    if (!result) throw new NotFoundException();
    return result;
  }

  // POST api/product
  @Post()
  async create(
    @Body() product: ProductAddAndUpdateStateDTO,
  ): Promise<ProductDTO> {
    const result = await this.service.createAndReturn(product);
    if (!result)
      throw new InternalServerErrorException({
        message: 'Failed to create product',
      });
    return result;
  }
}
