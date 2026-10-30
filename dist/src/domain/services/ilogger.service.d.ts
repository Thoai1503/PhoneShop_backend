import type { LoggingContextEntity } from '../entities/logging/logging.entity.js';
export interface ILoggerService {
    logger(message: unknown, context?: LoggingContextEntity): void;
    err(message: unknown, context: LoggingContextEntity): void;
    warning(message: unknown, context: LoggingContextEntity): void;
}
