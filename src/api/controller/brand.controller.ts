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
    @Body() body: BrandDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const brand = await this.service.create({
      name: body.name ?? '',
      slug: body.slug ?? '',
      status: body.status ?? 1,
    });
    return respondSuccess(req, res, 200, brand.id, {
      message: 'Brand created',
    });
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
