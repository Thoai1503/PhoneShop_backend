import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import type { Express } from 'express';
import { AppModule } from './app.module';

function getCorsOrigins() {
  const origins = process.env.CORS_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins && origins.length > 0 ? origins : true;
}

function configureApp(app: NestExpressApplication) {
  app.enableCors({
    origin: getCorsOrigins(),
    credentials: true,
  });
}

export async function createNestApp(expressApp?: Express) {
  const app = expressApp
    ? await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(expressApp),
      )
    : await NestFactory.create<NestExpressApplication>(AppModule);

  configureApp(app);
  return app;
}
