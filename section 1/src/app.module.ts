import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './routes/user/user.module';
import { User } from './routes/user/entities/user.entity';
import { PostModule } from './routes/post/post.module';
import { PhotoModule } from './routes/photo/photo.module';
import * as dotenv from 'dotenv';
import { Post } from './routes/post/entities/post.entity';
import { Photo } from './routes/photo/entities/photo.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      entities: [User, Post, Photo],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
