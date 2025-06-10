import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    //kết nối TCP đến service 2 thông qua port 3002
    ClientsModule.registerAsync([
      {
        imports: [],
        name: 'MATH_SERVICE',
        useFactory: async () => ({
          transport: Transport.GRPC,
          options: {
            url: '0.0.0.0:3001',
            package: 'service1',
            protoPath: join(process.cwd(), 'proto/service1.proto'),
          },
        }),
      },
    ]),],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
