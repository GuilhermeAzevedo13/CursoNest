import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove coisas q nao ta no DTO
      forbidNonWhitelisted: true, //Levanta o erro quando algo nao deveria existir dentro do body do json
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
