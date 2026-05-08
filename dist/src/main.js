import 'dotenv/config';
import { createNestApp } from './app.factory.js';
async function bootstrap() {
    const app = await createNestApp();
    await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map