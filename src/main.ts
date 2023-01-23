import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { getValidationPipe } from './getValidationPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(getValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cocktails API')
    .setVersion('1.0')
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
