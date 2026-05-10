import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { OrderService } from '../../application/service/order.service.js';
import { respondSuccess } from '../../common/http/response.util.js';

@Controller('api/v1/order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Get()
  async getAllOrder(
    @Req() req: Request,
    @Query('page') pageQuery: string,
    @Query('search') searchQuery: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const searchStr = typeof searchQuery === 'string' ? searchQuery.trim() : '';
    const page = Number(pageQuery) || 1;
    const limit = 8;
    const start = (page - 1) * limit;
    const end = start + limit;

    let list = await this.service.findAll();

    if (searchStr !== '') {
      list = list.filter((item) => {
        const phone = (item.user?.phone || '').trim();
        return phone.includes(searchStr);
      });
    }

    const count = list.length;
    const totalPages = Math.ceil(count / limit);
    list = list.slice(start, end);

    return respondSuccess(
      req,
      res,
      200,
      { list, page, totalPages },
      {
        message: 'Orders fetched',
        data: { list, page, totalPages },
        meta: { page, totalPages, count },
      },
    );
  }

  @Get('user/:user_id')
  async getByUserId(
    @Req() req: Request,
    @Param('user_id', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.getByUserId(userId);
    return respondSuccess(req, res, 200, list);
  }

  @Get(':id')
  async getById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const order = await this.service.findById(id);
    return respondSuccess(req, res, 200, order);
  }
}
