import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from '../../application/service/cart.service';
import { CartDTO } from '../dto/product.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  // GET api/cart/user/:userId
  @Get('user/:userId')
  async findByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CartDTO[]> {
    return this.service.findByUserId(userId);
  }
}
