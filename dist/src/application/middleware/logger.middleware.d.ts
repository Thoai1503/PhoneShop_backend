import { NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../service/logger.service.js';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly loggerService;
    constructor(loggerService: LoggerService);
    use(req: any, res: any, next: any): any;
}
