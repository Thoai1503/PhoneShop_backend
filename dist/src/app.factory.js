import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
function getCorsOrigins() {
    const origins = process.env.CORS_ORIGIN?.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    return origins && origins.length > 0 ? origins : true;
}
function configureApp(app) {
    app.enableCors({
        origin: getCorsOrigins(),
        credentials: true,
    });
}
export async function createNestApp(expressApp) {
    const app = expressApp
        ? await NestFactory.create(AppModule, new ExpressAdapter(expressApp))
        : await NestFactory.create(AppModule);
    configureApp(app);
    return app;
}
//# sourceMappingURL=app.factory.js.map