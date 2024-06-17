import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isUnique } from "src/commons/validator";

export class UserDto {


    id: number

    @IsEmail()
    @IsNotEmpty()
    @isUnique({ tableName: 'user', column: 'email'} )
    email: string

    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsString()
    @IsNotEmpty()
    @isUnique({ tableName: 'user', column: 'username'} )
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}