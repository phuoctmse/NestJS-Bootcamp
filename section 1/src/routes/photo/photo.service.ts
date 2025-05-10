import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: MongoRepository<Photo>,
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>,
  ) {}

  private async findPost(postId: string) {
    const post = await this.postRepository.findOne({ where: { _id: new ObjectId(postId) } });
    return post;
  }

  async create(createPhotoDto: CreatePhotoDto) {
    const post = await this.findPost(createPhotoDto.postId);
    const photo = new Photo(createPhotoDto.url, createPhotoDto.description, post as Post);
    return await this.photoRepository.insertOne(photo);
  }

  async findAll() {
    return await this.photoRepository.find();
  }

  async findOne(id: string) {
    const photo = await this.photoRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.photoRepository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatePhotoDto });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  async remove(id: string) {
    const photo = await this.photoRepository.findOneAndDelete({ _id: new ObjectId(id) });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }
}
