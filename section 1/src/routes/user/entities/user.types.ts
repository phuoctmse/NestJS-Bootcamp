import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/routes/post/entities/post.type';

@ObjectType()
export class User {
    @Field()
    _id: string;

    @Field()
    email: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    isActive: boolean;

    // @Field(() => [Post])
    // posts: Post[];
}