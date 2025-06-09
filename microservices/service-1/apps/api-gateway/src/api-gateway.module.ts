import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    //kết nối TCP đến service 2 thông qua port 3002
    ClientsModule.registerAsync([
      {
        imports: [],
        name: 'MATH_SERVICE',
        useFactory: async () => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3002
          },
        }),
      },
    ]),],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule { }
