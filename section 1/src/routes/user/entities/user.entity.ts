import { Entity, Column, ObjectId, ObjectIdColumn, OneToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity'; 

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor(firstName: string, lastName: string, email: string, password: string, isActive?: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isActive = isActive ?? true;
  }
}