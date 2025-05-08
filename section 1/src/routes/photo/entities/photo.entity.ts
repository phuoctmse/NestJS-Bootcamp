import { Entity, Column, ObjectId, ObjectIdColumn, ManyToOne } from 'typeorm';
import { Post } from '../../post/entities/post.entity'; 

@Entity()
export class Photo {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    url: string;

    @Column()
    description: string;

    @ManyToOne(() => Post, (post) => post.photos)
    post: Post;

    constructor(url: string, description: string, post: Post) {
        this.url = url;
        this.description = description;
        this.post = post;
    }
}