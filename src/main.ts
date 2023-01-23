import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_KEY_HEADER } from './common';
import { AllExceptionsFilter } from './exception.filter';
import { getValidationPipe } from './getValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(getValidationPipe());

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Cocktails API')
    .setVersion('1.0')
    .setDescription(
      'API for cocktails receipes. Build with [NestJS](https://nestjs.com) for practice purpose. [Source code](https://github.com/WilldV/cocktails-api)',
    )
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: API_KEY_HEADER,
        description: 'Defined API KEY',
      },
      API_KEY_HEADER,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    customSiteTitle: 'Cocktails API',
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
