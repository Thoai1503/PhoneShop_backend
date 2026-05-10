import { Controller, Get, Param, ParseIntPipe, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { OrderDetailService } from '../../application/service/order-detail.service.js';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/order-detail')
export class OrderDetailController {
  constructor(private readonly service: OrderDetailService) {}

  @Get('order/:order_id')
  async getAllOrder(
    @Req() req: Request,
    @Param('order_id', ParseIntPipe) orderId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.findByOrderId(orderId);
    return respondSuccess(req, res, 200, list);
  }
}
