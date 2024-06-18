import { Body, Controller, Get, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { resBuilder } from 'src/commons/utils';
import { StatusCode, Message } from 'src/commons/constants';
import { UserDto } from './dto/user.dto';

@Controller('/api/v1/users/')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('')
    async getAll(@Res() res: Response) {
        const users = await this.userService.getAll();
        const userCount = await this.userService.countAll();
        resBuilder(res, StatusCode.OK, Message.DataLoaded, userCount, users)
    }

    @Post('')
    async create(@Res() res: Response, @Body() userDto: UserDto) {
        const user = await this.userService.create(res, userDto);
        resBuilder(res, StatusCode.OK, Message.DataAdded, user);
    }

}