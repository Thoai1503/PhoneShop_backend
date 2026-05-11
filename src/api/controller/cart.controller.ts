import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CartService } from '../../application/service/cart.service.js';
import { CartDTO } from '../dto/product.dto.js';
import type { Request, Response } from 'express';
import {
  respondError,
  respondSuccess,
} from '../../common/http/response.util.js';

@Controller('api/cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post()
  async addToCart(
    @Req() req: Request,
    @Body()
    body: {
      user_id: number;
      variant_id: number;
      quantity: number;
      unit_price?: number;
    },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const cart = await this.service.create({
        user_id: body.user_id,
        variant_id: body.variant_id,
        quantity: body.quantity,
        unit_price: body.unit_price,
      });
      return respondSuccess(req, res, 201, cart, { message: 'Added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return respondError(
        req,
        res,
        500,
        { error: 'Failed to add item to cart' },
        'Failed to add item to cart',
      );
    }
  }

  // GET api/cart/user/:userId
  @Get('user/:userId')
  async findByUserId(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const list = await this.service.findByUserId(userId);
    return respondSuccess(req, res, 200, list);
  }

  @Post(':id')
  async updateQuantity(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { quantity: number | string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const quantity = Number(body.quantity);
      let result = false;

      if (quantity === 0) {
        result = await this.service.deleteById(id);
      } else {
        result = await this.service.updateQuantity(id, quantity);
      }

      return respondSuccess(
        req,
        res,
        200,
        { message: result },
        {
          message: 'Quantity updated',
          data: result,
        },
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
      return respondError(
        req,
        res,
        500,
        { error: 'Failed to retrieve cart items' },
        'Failed to retrieve cart items',
      );
    }
  }

  @Post('list')
  async addListToCart(
    @Req() req: Request,
    @Body()
    body: {
      user_id: number;
      items: Array<{
        variant_id: number;
        quantity: number;
        unit_price?: number;
      }>;
    },
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const promiseArr = body.items.map((item) =>
        this.service.create({
          user_id: body.user_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }),
      );

      await Promise.all(promiseArr);
      return respondSuccess(
        req,
        res,
        201,
        { message: 'Items added to cart' },
        {
          message: 'Items added to cart',
          data: true,
        },
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      return respondError(
        req,
        res,
        500,
        { error: 'Failed to add items to cart' },
        'Failed to add items to cart',
      );
    }
  }

  @Delete('user/:userId')
  async clearCart(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    try {
      const result = await this.service.deleteByUserId(userId);
      return respondSuccess(
        req,
        res,
        200,
        { message: result },
        {
          message: 'Cart cleared',
          data: result,
        },
      );
    } catch (error) {
      console.error('Error clearing cart items:', error);
      return respondError(
        req,
        res,
        500,
        { error: 'Failed to clear cart items' },
        'Failed to clear cart items',
      );
    }
  }
}
