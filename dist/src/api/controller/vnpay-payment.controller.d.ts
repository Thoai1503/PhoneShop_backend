import type { Request, Response } from 'express';
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';
export declare class VNPayPaymentController {
    private readonly service;
    constructor(service: PaymentService);
    vnpayReturn(req: Request, res: Response): Promise<Response>;
    createPaymentTest(req: Request, body: PaymentRequestDTO, res: Response): Promise<Response>;
}
