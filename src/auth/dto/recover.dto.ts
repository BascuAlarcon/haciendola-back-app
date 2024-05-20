import { IsEmail, IsOptional, IsString } from "class-validator";

export class RecoverDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}