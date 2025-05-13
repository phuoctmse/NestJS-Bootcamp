// src/graphql/graphql.module.ts
import { Module } from "@nestjs/common";
import { AppResolver } from "./graphql.resolver";
import { UserService } from "src/routes/user/user.service";
import { PostService } from "src/routes/post/post.service";
import { PhotoService } from "src/routes/photo/photo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "src/routes/post/entities/post.entity";
import { User } from "src/routes/user/entities/user.entity";
import { Photo } from "src/routes/photo/entities/photo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Post, Photo])],
    providers: [AppResolver, UserService, PostService, PhotoService]
})
export class GraphqlModule { }