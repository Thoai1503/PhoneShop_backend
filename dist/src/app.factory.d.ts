import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { Express } from 'express';
export declare function createNestApp(expressApp?: Express): Promise<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>>;
