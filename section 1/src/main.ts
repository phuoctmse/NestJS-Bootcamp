import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // tự động loại bỏ các field ko đc khai báo decorator trong DTO
    forbidNonWhitelisted: true, //field ko có trong DTO sẽ báo lỗi
  }));
  // app.useGlobalInterceptors(new TransformInterceptor()) testing graphql
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
