import { IsString } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    url: string;
    
    @IsString()
    description: string;
    
    @IsString()
    postId: string; // ID của bài viết liên quan
}
