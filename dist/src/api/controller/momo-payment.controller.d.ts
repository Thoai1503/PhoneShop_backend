import type { Request, Response } from 'express';
import { PaymentService } from '../../application/service/payment.service.js';
import { PaymentRequestDTO } from '../dto/payment.dto.js';
export declare class MoMoPaymentController {
    private readonly service;
    constructor(service: PaymentService);
    createPayment(req: Request, body: PaymentRequestDTO, res: Response): Promise<Response>;
}
