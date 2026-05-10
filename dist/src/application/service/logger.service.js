var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Logger } from '@nestjs/common';
export class Context {
    module;
    method;
}
let LoggerService = class LoggerService extends Logger {
    logger(message, context) {
        const now = new Date();
        const standard = {
            server: process.env.APP_HOST || '0.0.0.0',
            type: 'INFO',
            timestamp: now.toISOString(),
            epochMs: now.getTime(),
        };
        const data = { ...standard, ...context, message };
        super.log(data);
    }
    err(message, context) {
        const now = new Date();
        const standard = {
            server: process.env.APP_HOST || '0.0.0.0',
            type: 'ERROR',
            timestamp: now.toISOString(),
            epochMs: now.getTime(),
        };
        const data = { ...standard, ...context, message };
        super.error(data);
    }
    warning(message, context) {
        const now = new Date();
        const standard = {
            server: process.env.APP_HOST || '0.0.0.0',
            type: 'WARNING',
            timestamp: now.toISOString(),
            epochMs: now.getTime(),
        };
        const data = { ...standard, ...context, message };
        super.warn(data);
    }
};
LoggerService = __decorate([
    Injectable()
], LoggerService);
export { LoggerService };
//# sourceMappingURL=logger.service.js.map