import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {


    id: number

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}