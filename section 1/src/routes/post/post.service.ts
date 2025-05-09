import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }

  private async findUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { _id: new ObjectId(userId) } })
    return user

  }

  async create(createPostDto: CreatePostDto) {
    const user = await this.findUser(createPostDto.userId)
    const post = new Post(createPostDto.title, createPostDto.content, user as User)
    return await this.postRepository.insertOne(post)

  }

  async findAll() {
    return await this.postRepository.find()
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({ where: { _id: id } })
    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneAndUpdate({ _id: new ObjectId(id), 'user._id': new ObjectId(updatePostDto.userId) }, { $set: updatePostDto })
    if (!post) {
      throw new NotFoundException('Post not found')
    }
    return post
  }

  async remove(id: string) {
    const post = await this.postRepository.findOneAndDelete({ _id: new ObjectId(id) })
    return post
  }
}
