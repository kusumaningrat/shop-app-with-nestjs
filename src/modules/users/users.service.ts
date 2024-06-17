import { Body, Injectable, Res } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { hashPassword, resBuilder } from 'src/commons/utils';
import { Response } from 'express';
import { Message, StatusCode } from 'src/commons/constants';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async countAll(): Promise<Number> {
        return await this.userRepository.count()
    }

    async create(@Res() res: Response, userDto: UserDto): Promise<User> {

        try {
            const hashedPassword = hashPassword(userDto.password)
            const userObj = {
                id: userDto.id,
                email: userDto.email,
                fullname: userDto.fullname,
                username: userDto.username,
                password: hashedPassword
            }
            return await this.userRepository.save(userObj)
        } catch (err) {
            console.log(err)
            resBuilder(res, StatusCode.InternalServerError, Message.InternalError);
        }

    }

}
