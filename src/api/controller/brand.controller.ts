import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { BrandService } from '../../application/service/brand.service.js';
import { BrandDTO } from '../dto/brand.dto.js';
import type { Request, Response } from 'express';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/brand')
export class BrandController {
  constructor(private readonly service: BrandService) {}

  // POST api/brand
  @Post()
  async createBrand(
    @Req() req: Request,
    @Body()
    body: { id?: number; name?: string; slug?: string; status?: number },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const newBrand = new BrandDTO();
      newBrand.id = body.id ?? 0;
      newBrand.name = body.name ?? '';
      newBrand.slug = body.slug ?? '';
      newBrand.status = body.status ?? 1;

      const data = await this.service.create(newBrand);
      return respondSuccess(req, res, 200, data, { message: 'Brand created' });
    } catch (error) {
      throw error;
    }
  }

  // GET api/brand
  @Get()
  async getAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.getAll();
    return respondSuccess(req, res, 200, list);
  }
}
