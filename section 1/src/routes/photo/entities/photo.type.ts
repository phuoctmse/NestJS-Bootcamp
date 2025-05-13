import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "src/routes/post/entities/post.type";

@ObjectType()
export class Photo {
    @Field()
    _id: string;

    @Field()
    url: string;

    @Field()
    description: string;

    @Field(() => [Post])
    post: Post;
}