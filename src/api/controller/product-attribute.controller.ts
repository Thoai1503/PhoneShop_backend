import { Body, Controller, Put, Param, ParseIntPipe } from '@nestjs/common';
import { ProductAttributeService } from '../../application/service/product-attribute.service.js';
import { ProductAttributeDTO } from '../dto/product.dto.js';

@Controller('api/productattribute')
export class ProductAttributeController {
  constructor(private readonly service: ProductAttributeService) {}

  // PUT api/productattribute/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: ProductAttributeDTO,
  ): Promise<boolean> {
    return this.service.update(id, entity);
  }
}
