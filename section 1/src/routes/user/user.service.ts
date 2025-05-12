import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';
import { RegisterBodyDTO } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }

  // async create(createUserDto: CreateUserDto) {
  //   const user = new User(createUserDto.firstName, createUserDto.lastName);
  //   return await this.userRepository.insertOne(user);
  // }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new UnprocessableEntityException([
        {
          field: 'email',
          error: 'User not found'
        }
      ])
    }
    const isPasswordValid = user.password === password
    if (isPasswordValid === false) {
      throw new UnprocessableEntityException([
        {
          field: 'password',
          error: 'Invalid password'
        }
      ])
    }
    return user
  }

  async register(body: RegisterBodyDTO) {
    const user = new User(body.firstName, body.lastName, body.email, body.password);
    return await this.userRepository.insertOne(user);
  }

  async findAll() {
    const users = await this.userRepository.find()
    return users
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updated_user = await this.userRepository.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updateUserDto })
    return updated_user
  }

  async remove(id: string) {
    const deleted_user = await this.userRepository.findOneAndDelete({ _id: new ObjectId(id) })
    return deleted_user
  }
}
