import { IsEmail, IsString, Length } from "class-validator"

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
    
    confirmPassword: string
}
