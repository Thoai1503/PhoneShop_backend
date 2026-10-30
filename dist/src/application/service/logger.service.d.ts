import { Logger } from '@nestjs/common';
import type { ILoggerService } from '../../domain/services/ilogger.service.js';
export declare class Context {
    module: string;
    method: string;
}
export declare class LoggerService extends Logger implements ILoggerService {
    logger(message: unknown, context?: Context): void;
    err(message: unknown, context: Context): void;
    warning(message: unknown, context: Context): void;
}
