import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { LoginBodyDTO, RegisterBodyDTO, TokenPayloadDTO } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(body: LoginBodyDTO) {
        const user = await this.userService.login(body.email, body.password)
        const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName, isActive: user.isActive }
        const tokens = await this.generateTokens(payload)
        return { tokens }
    }

    async register(body: RegisterBodyDTO) {
        const user = await this.userService.register(body)
        return user
    }

    async generateTokens(payload: TokenPayloadDTO) {
        const accessToken = await this.jwtService.sign(payload, { secret: process.env.SECRET_KEY, expiresIn: '1h' })
        return { accessToken }
    }

    async verifyToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, { secret: process.env.SECRET_KEY })
            return payload
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }
}
