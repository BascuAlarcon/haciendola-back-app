import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    newPassword: string;
}