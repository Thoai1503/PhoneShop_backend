//import { APP_HOST } from '@constants';
import { Injectable, Logger } from '@nestjs/common';
import type { ILoggerService } from '../../domain/services/ilogger.service.js';

export class Context {
  module: string;
  method: string;
}

@Injectable()
export class LoggerService extends Logger implements ILoggerService {
  logger(message: unknown, context?: Context) {
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

  err(message: unknown, context: Context) {
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

  warning(message: unknown, context: Context) {
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
}
