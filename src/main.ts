import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      whitelist: true,
      exceptionFactory(errors) {
        const message = {};

        errors.forEach(({ property, constraints }) => {
          message[property] = Object.values(constraints);
        });

        throw new BadRequestException({
          statusCode: 400,
          message,
          error: 'Bad Request',
        });
      },
      transform: true,
    }),
  );

  await app.listen(process.env.PORT || 3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
