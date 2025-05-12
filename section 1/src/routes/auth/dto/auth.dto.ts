import { IsEmail, IsString, Length } from "class-validator"
import { Match } from "src/routes/decorator/custom.decorator."

export class LoginBodyDTO {
    @IsEmail()
    email: string

    @IsString()
    password: string
}

export class RegisterBodyDTO {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @Length(4, 10, { message: 'Password must be between 4 and 10 characters' })
    password: string

    @IsString()
    @Match('password', { message: 'Password does not match' })
    confirmPassword: string
}

export class TokenPayloadDTO {

    @IsEmail()
    email: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string
}
