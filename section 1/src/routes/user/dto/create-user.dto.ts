import { IsBoolean, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    firstName: string
    @IsString()
    lastName: string
}
