import { Body, Injectable, Res } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { hashPassword, resBuilder } from 'src/commons/utils';
import { Response } from 'express';
import { Message, StatusCode } from 'src/commons/constants';
import { IfEmptyThrowError, IfNotEmptyThrowError } from 'src/commons/checks';
import { CustomError } from 'src/commons/customError';
import { Barang } from '../barang/barang.entity';

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

    async getOne(@Res() res: Response, id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id }})
            IfEmptyThrowError(user, Message.DataFailLoaded);
            return user;
        } catch (err) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async create(@Res() res: Response, userDto: UserDto): Promise<User> {

        try {
            const check = await this.userRepository.findOne({ 
                where: { 
                    username: userDto.username,
                }
            });
            IfNotEmptyThrowError(check, Message.DataAlreadyExist)
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
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async update(@Res() res: Response, id: number, userDto: Partial<User>): Promise<User> {

        try {

            const user = await this.userRepository.findOne({ where: { id }});
            console.log(user)
            IfEmptyThrowError(user, Message.DataFailLoaded)

            await this.userRepository.update(id, { ...userDto, id })
            return await this.userRepository.findOne({ where: { id }})

        } catch (err) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async destroy(@Res() res: Response, id: number): Promise<User> {
        const check = await this.userRepository.findOne({ where: { id : id}})
        try {
            IfEmptyThrowError(check, Message.DataFailLoaded)
            await this.userRepository.delete(id)
            return check
        } catch (err) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

}
