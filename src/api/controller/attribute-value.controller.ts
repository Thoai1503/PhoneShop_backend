import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AttributeValueService } from 'src/application/service/attribute-value.service';
import { AttributeValueDTO } from '../dto/attribute.dto';

@Controller('api/attributevalue')
export class AttributeValueController {
  constructor(private readonly service: AttributeValueService) {}

  // GET api/attributevalue/Attribute/:attributeId
  @Get('Attribute/:attributeId')
  async getByAttributeId(
    @Param('attributeId', ParseIntPipe) attributeId: number,
  ): Promise<AttributeValueDTO[]> {
    return this.service.getByAttributeId(attributeId);
  }
}
