import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { DistrictService } from '../../application/service/district.service.js';
import type { Request, Response } from 'express';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/district')
export class DistrictController {
  constructor(private readonly service: DistrictService) {}

  @Get('province/:province_id')
  async getByProvinceId(
    @Req() req: Request,
    @Param('province_id', ParseIntPipe) provinceId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.getByProvinceId(provinceId);
    return respondSuccess(req, res, 200, list);
  }
}
