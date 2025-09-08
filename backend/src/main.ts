import { ValidationPipe ,Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Case API')
    .setDescription('Users & Posts CRUD')
    .setVersion('1.0')

    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);  

  await app.listen(4001);
  const logger = new Logger('Bootstrap');
  logger.log(`API: http://localhost:4001/api  |  Swagger: http://localhost:4001/docs`);
}
bootstrap();
