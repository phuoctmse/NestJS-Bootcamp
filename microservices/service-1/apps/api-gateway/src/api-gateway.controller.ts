import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class ApiGatewayController {
  private heroesService: HeroesService;

  constructor(
    // @Inject('MATH_SERVICE') private client: ClientProxy,
    @Inject('MATH_SERVICE') private client: ClientGrpc,
    private readonly apiGatewayService: ApiGatewayService) { }

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  @Get()
  getHero(): Observable<string> {
    return this.heroesService.findOne({ id: 1 });
  }

  // @Get('sum')
  // async accumulate(): Promise<any> {
  //   return await this.client.send({ cmd: 'sum' }, [1, 2, 3, 4, 5]);
  // }
}

interface HeroesService {
  findOne(data: { id: number }): Observable<any>;
}
