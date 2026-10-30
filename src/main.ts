import 'dotenv/config';
import { createNestApp } from './app.factory.js';
import { LoggingInterceptor } from './infrastruture/interceptor/logging.interceptor.js';

async function bootstrap() {
  const app = await createNestApp();
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
