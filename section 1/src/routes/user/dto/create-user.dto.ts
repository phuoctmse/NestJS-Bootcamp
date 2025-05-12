import { IsBoolean, IsEmail, IsOptional, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    firstName: string
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    @Length(4, 10, { message: 'Password must be between 4 and 10 characters' })
    password: string
}
