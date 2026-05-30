import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';

@Controller('api/v1/payment')
export class VNPayPaymentController {
  constructor(private readonly service: PaymentService) {}

  @Get('vnpay_return')
  async vnpayReturn(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.service.handleVNPayReturn(
      req.query as Record<string, unknown>,
    );

    if (!result) {
      return res.status(400).json({ code: '97', message: 'Invalid signature' });
    }

    res.redirect(result.redirectUrl);
    return res;
  }

  // POST api/v1/payment/create_payment_test
  // Kept as POST in the sample flow.
  @Post('create_payment_test')
  async createPaymentTest(
    @Req() req: Request,
    @Body() body: PaymentRequestDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const url = await this.service.createVNPayPayment(body, req);
    return res.status(200).json({ success: true, url });
  }
}
