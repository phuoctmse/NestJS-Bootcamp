import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { LoginBodyDTO, RegisterBodyDTO } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(body: LoginBodyDTO) {
        const user = await this.userService.login(body.email, body.password)
        return user
    }

    async register(body: RegisterBodyDTO) {
        const user = await this.userService.register(body)
        return user
    }
}
