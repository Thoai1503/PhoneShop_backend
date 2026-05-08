"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app_factory_1 = require("../src/app.factory");
let cachedHandler = null;
async function getHandler() {
    if (cachedHandler) {
        return cachedHandler;
    }
    const expressApp = (0, express_1.default)();
    const app = await (0, app_factory_1.createNestApp)(expressApp);
    await app.init();
    cachedHandler = expressApp;
    return cachedHandler;
}
async function handler(req, res) {
    const app = await getHandler();
    return app(req, res);
}
//# sourceMappingURL=index.js.map