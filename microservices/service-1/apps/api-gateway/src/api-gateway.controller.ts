import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly apiGatewayService: ApiGatewayService) { }

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Get('sum')
  async accumulate(): Promise<any> {
    return await this.client.send({ cmd: 'sum' }, [1, 2, 3, 4, 5]);
  }
}
