import type { Request } from 'express';
import { PaymentRepository } from '../../infrastruture/repository/payment.repository.js';
import { PaymentRequestDTO } from '../../api/dto/payment.dto.js';
export declare class PaymentService {
    private readonly repo;
    constructor(repo: PaymentRepository);
    private getClientIp;
    private normalizeOrderInfo;
    private encodeOrderInfo;
    private formatDate;
    private buildVnpayQuery;
    private createVnpaySecureHash;
    private verifyVnpayQuery;
    createVNPayPayment(payload: PaymentRequestDTO, req: Request): Promise<string>;
    handleVNPayReturn(query: Record<string, unknown>): Promise<{
        redirectUrl: string;
    } | null>;
    createMoMoPayment(payload: PaymentRequestDTO, req: Request): Promise<string>;
    private estimateCartTotal;
}
