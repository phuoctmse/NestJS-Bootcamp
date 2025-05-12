import { Body, Controller, Post } from '@nestjs/common';
import { LoginBodyDTO, RegisterBodyDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginBodyDTO) {
        const result = await this.authService.login(body)
        return {
            message: 'Login successful',
            data: result
        }
    }

    @Post('register')
    async register(@Body() body: RegisterBodyDTO) {
        const result = await this.authService.register(body)
        return {
            message: 'Register successful',
            data: result
        }
    }
}
