
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ApiGatewayModule } from 'apps/api-gateway/src/api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiGatewayModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );
  await app.listen();
}
bootstrap();
