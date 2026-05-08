import { Body, Controller, Get, Post } from '@nestjs/common';
import { VariantAttributeService } from 'src/application/service/variant-attribute.service';
import { VariantAttributeDTO } from '../dto/product.dto';

@Controller('api/variantattribute')
export class VariantAttributeController {
  constructor(private readonly service: VariantAttributeService) {}

  // GET api/variantattribute
  @Get()
  async getAll(): Promise<VariantAttributeDTO[]> {
    return this.service.getAll();
  }

  // POST api/variantattribute/updatelist
  @Post('updatelist')
  async updateFromList(@Body() list: VariantAttributeDTO[]): Promise<boolean> {
    return this.service.updateFromList(list);
  }
}
