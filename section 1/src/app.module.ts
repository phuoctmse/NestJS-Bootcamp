import { ClassSerializerInterceptor, Module } from '@nestjs/common';
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
import { AuthModule } from './routes/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

    }),
    UserModule,
    PostModule,
    PhotoModule,
    AuthModule,
    GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule { }
