import { ObjectType, Field } from '@nestjs/graphql';
import { Photo } from 'src/routes/photo/entities/photo.type';
import { User } from 'src/routes/user/entities/user.types';

@ObjectType()
export class Post {
    @Field()
    _id: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(() => User)
    user: User;

    @Field(() => [Photo])
    photos: Photo[];
}