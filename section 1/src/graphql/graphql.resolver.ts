// src/app.resolver.ts
import { Query, Resolver } from '@nestjs/graphql';
import { Photo } from 'src/routes/photo/entities/photo.entity';
import { PhotoService } from 'src/routes/photo/photo.service';
import { Post } from 'src/routes/post/entities/post.entity';
import { PostService } from 'src/routes/post/post.service';
import { User } from 'src/routes/user/entities/user.types';
import { UserService } from 'src/routes/user/user.service';

@Resolver()
export class AppResolver {
    constructor(
        private readonly userService: UserService,
        private readonly postService: PostService,
        private readonly photoService: PhotoService,
    ) { }
    @Query(() => [User])
    async getUsers(): Promise<User[]> {
        const users = await this.userService.findAll();
        console.log(users)
        return users.map(user => ({
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
        }));
    }

    // @Query(() => [Post])
    // async getPosts(): Promise<Post[]> {
    // @Query(() => [Post])
    // async getPosts(): Promise<Post[]> {
    //     return this.postService.findAll(); // Ensure you have a findAll method in PostService
    // }

    // @Query(() => [Photo])
    // async getPhotos(): Promise<Photo[]> {
    //     return this.photoService.findAll(); // Ensure you have a findAll method in PhotoService
    // }
}