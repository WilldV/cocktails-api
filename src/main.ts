import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getValidationPipe } from './getValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(getValidationPipe());

  await app.listen(process.env.PORT || 3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
