import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    userId: string;
}
