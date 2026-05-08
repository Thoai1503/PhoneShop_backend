"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestApp = createNestApp;
require("dotenv/config");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
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
async function createNestApp(expressApp) {
    const app = expressApp
        ? await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp))
        : await core_1.NestFactory.create(app_module_1.AppModule);
    configureApp(app);
    return app;
}
//# sourceMappingURL=app.factory.js.map