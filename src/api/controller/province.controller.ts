import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProvinceService } from '../../application/service/province.service.js';
import type { Request, Response } from 'express';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/v1/province')
export class ProvinceController {
  constructor(private readonly service: ProvinceService) {}

  @Get()
  async getAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.findAll();
    return respondSuccess(req, res, 200, list);
  }
}
