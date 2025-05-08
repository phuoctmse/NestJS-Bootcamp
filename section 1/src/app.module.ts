import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routes/user/user.module';
import { User } from './routes/user/entities/user.entity';
import { PostModule } from './routes/post/post.module';
import { PhotoModule } from './routes/photo/photo.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URI,
      database: process.env.MONGODB_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
