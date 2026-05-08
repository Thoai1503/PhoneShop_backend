import 'dotenv/config';
import express from 'express';
import { createNestApp } from '../src/app.factory.js';
let cachedHandler = null;
async function getHandler() {
    if (cachedHandler) {
        return cachedHandler;
    }
    const expressApp = express();
    const app = await createNestApp(expressApp);
    await app.init();
    cachedHandler = expressApp;
    return cachedHandler;
}
export default async function handler(req, res) {
    const app = await getHandler();
    return app(req, res);
}
//# sourceMappingURL=index.js.map