import { Logger } from '@nestjs/common';
export declare class Context {
    module: string;
    method: string;
}
export declare class LoggerService extends Logger {
    logger(message: any, context?: Context): void;
    err(message: any, context: Context): void;
    warning(message: any, context: Context): void;
}
