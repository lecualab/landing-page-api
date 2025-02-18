import { Logger } from '@nestjs/common';
import { setupApp } from './app.setup';

async function bootstrap() {
  const [app] = await setupApp();

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    Logger.log(`App is running on port ${String(port)}`, 'Bootstrap');
  });
}

void bootstrap();
