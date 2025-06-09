import { Test, TestingModule } from '@nestjs/testing';
import { Service2Controller } from './service-2.controller';
import { Service2Service } from './service-2.service';

describe('Service2Controller', () => {
  let service2Controller: Service2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Service2Controller],
      providers: [Service2Service],
    }).compile();

    service2Controller = app.get<Service2Controller>(Service2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service2Controller.getHello()).toBe('Hello World!');
    });
  });
});
