var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../service/logger.service.js';
const REDACT_KEYS = [
    /pass/i,
    /token/i,
    /auth/i,
    /secret/i,
    /^email$/i,
    /code/i,
];
const SKIP_PATHS = new Set([
    '/',
    '/health',
    '/metrics',
    '/favicon.ico',
]);
const SKIP_METHODS = new Set(['OPTIONS', 'HEAD']);
let LoggerMiddleware = class LoggerMiddleware {
    loggerService;
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    use(req, res, next) {
        const method = req.method;
        const rawUrl = req.originalUrl || req.url || '';
        const urlPath = rawUrl.split('?')[0];
        if (SKIP_METHODS.has(method) || SKIP_PATHS.has(urlPath)) {
            return next();
        }
        const startTime = Date.now();
        const isProd = (process.env.NODE_ENV || 'development') === 'production';
        res.on('finish', () => {
            const durationMs = Date.now() - startTime;
            const { statusCode } = res;
            const forwardedFor = req.headers?.['x-forwarded-for'] || '';
            const clientIp = forwardedFor.split(',')[0]?.trim() ||
                req.ip ||
                req.socket?.remoteAddress;
            const userAgent = req.headers?.['user-agent'];
            const baseLog = {
                method,
                url: urlPath,
                statusCode,
                durationMs,
                requestId: req.requestId || req.headers?.['x-request-id'],
                clientIp,
                userAgent,
                userId: req.user?.id,
            };
            const isServerError = statusCode >= 500;
            const isClientError = statusCode >= 400 && statusCode < 500;
            const isSlow = durationMs > 1000;
            if (!isProd && ['POST', 'PUT', 'PATCH'].includes(method) && req.body) {
                const redactedBody = {};
                for (const [key, value] of Object.entries(req.body)) {
                    if (REDACT_KEYS.some((regex) => regex.test(key))) {
                        redactedBody[key] = '***';
                    }
                    else if (typeof value === 'string' && value.length > 256) {
                        redactedBody[key] = value.slice(0, 256) + '…';
                    }
                    else {
                        redactedBody[key] = value;
                    }
                }
                const payload = { ...baseLog, body: redactedBody };
                if (isServerError) {
                    this.loggerService.err(payload, { module: 'HTTP', method });
                }
                else if (isClientError || isSlow) {
                    this.loggerService.warning(payload, { module: 'HTTP', method });
                }
                else {
                    this.loggerService.logger(payload, { module: 'HTTP', method });
                }
            }
            else {
                if (isServerError) {
                    this.loggerService.err(baseLog, { module: 'HTTP', method });
                }
                else if (isClientError || isSlow) {
                    this.loggerService.warning(baseLog, { module: 'HTTP', method });
                }
                else {
                    this.loggerService.logger(baseLog, { module: 'HTTP', method });
                }
            }
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService])
], LoggerMiddleware);
export { LoggerMiddleware };
//# sourceMappingURL=logger.middleware.js.map