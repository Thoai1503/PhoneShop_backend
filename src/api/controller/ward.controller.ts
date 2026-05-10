import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import { WardService } from '../../application/service/ward.service.js';
import type { Request, Response } from 'express';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/ward')
export class WardController {
  constructor(private readonly service: WardService) {}

  @Get('district/:district_id')
  async getByDistrictId(
    @Req() req: Request,
    @Param('district_id', ParseIntPipe) districtId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.getByDistrictId(districtId);
    return respondSuccess(req, res, 200, list);
  }
}
