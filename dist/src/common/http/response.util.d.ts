import type { Request, Response } from 'express';
type SuccessOptions = {
    message?: string;
    data?: any;
    meta?: any;
};
export declare function shouldUseStandardResponse(req: Request): boolean;
export declare function respondSuccess(req: Request, res: Response, statusCode: number, legacyBody: any, options?: SuccessOptions): Response;
export declare function respondError(req: Request, res: Response, statusCode: number, legacyBody: any, message?: string): Response;
export {};
