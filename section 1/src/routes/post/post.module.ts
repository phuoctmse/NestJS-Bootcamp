import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Photo } from '../photo/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Photo])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
