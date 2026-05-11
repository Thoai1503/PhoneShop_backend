import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
function getCorsOrigins() {
    return process.env.CORS_ORIGIN?.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
}
function configureApp(app) {
    app.use(express.json({
        type: ['application/json', 'application/*+json', 'text/plain'],
    }));
    app.use(express.urlencoded({ extended: true }));
    app.enableCors({
        origin: getCorsOrigins(),
        credentials: true,
    });
    app.use(cookieParser());
}
export async function createNestApp(expressApp) {
    const app = expressApp
        ? await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
        : await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    configureApp(app);
    return app;
}
//# sourceMappingURL=app.factory.js.map