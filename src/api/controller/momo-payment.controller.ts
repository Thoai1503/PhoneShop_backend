import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';

@Controller('api/v1/momo-payment')
export class MoMoPaymentController {
  constructor(private readonly service: PaymentService) {}

  // POST api/v1/momo-payment/create_payment
  @Post('create_payment')
  async createPayment(
    @Req() req: Request,
    @Body() body: PaymentRequestDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const url = await this.service.createMoMoPayment(body, req);
    return res.status(200).json({ success: true, url });
  }
}
