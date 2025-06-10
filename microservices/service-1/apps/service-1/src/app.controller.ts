import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //day la 1 endpoint grpc goi den service1 va ham FindOne
  //GrpcMethod goi trong protocol bufferbuffer
  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById): Hero {
    return { id: 1, name: 'John222123123' };

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}
