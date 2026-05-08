import { Controller, Get } from '@nestjs/common';
import { BrandService } from '../../application/service/brand.service';
import { BrandDTO } from '../dto/brand.dto';

@Controller('api/brand')
export class BrandController {
  constructor(private readonly service: BrandService) {}

  // GET api/brand
  @Get()
  async getAll(): Promise<BrandDTO[]> {
    return this.service.getAll();
  }
}
