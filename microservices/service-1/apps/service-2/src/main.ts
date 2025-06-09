
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Service2Module } from './service-2.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    Service2Module,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    },
  );
  await app.listen();
}
bootstrap();
