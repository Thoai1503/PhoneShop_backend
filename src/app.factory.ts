import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import express, { type Express } from 'express';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

function getCorsOrigins() {
  const origins = process.env.CORS_ORIGIN?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins && origins.length > 0 ? origins : true;
}

function configureApp(app: NestExpressApplication) {
  // Accept JSON payloads even when clients mistakenly send text/plain.
  app.use(
    express.json({
      type: ['application/json', 'application/*+json', 'text/plain'],
    }),
  );
  app.use(express.urlencoded({ extended: true }));

  app.enableCors({
    origin: getCorsOrigins(),
    credentials: true,
  });
  app.use(cookieParser());
}

export async function createNestApp(expressApp?: Express) {
  const app = expressApp
    ? await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(expressApp),
      )
    : await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // loại bỏ field không khai báo trong DTO
      forbidNonWhitelisted: false,
      //transform: true,
    }),
  );

  configureApp(app);
  return app;
}
