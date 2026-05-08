"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_factory_1 = require("./app.factory");
async function bootstrap() {
    const app = await (0, app_factory_1.createNestApp)();
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map