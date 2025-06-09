import { Injectable } from '@nestjs/common';

@Injectable()
export class Service2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
