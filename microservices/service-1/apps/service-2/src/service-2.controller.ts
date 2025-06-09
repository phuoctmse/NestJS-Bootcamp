import { Controller, Get } from '@nestjs/common';
import { Service2Service } from './service-2.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class Service2Controller {
  constructor(private readonly service2Service: Service2Service) { }

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<any> {
    return (data || []).reduce((a, b) => a + b);
  }

  @Get()
  getHello(): string {
    return this.service2Service.getHello();
  }
}
