import { Body, Controller, Delete, Get, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { resBuilder } from 'src/commons/utils';
import { StatusCode, Message } from 'src/commons/constants';
import { UserDto } from './dto/user.dto';
import { CustomError } from 'src/commons/customError';

@Controller('/api/v1/users/')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('')
    async getAll(@Res() res: Response) {
        const users = await this.userService.getAll();
        const userCount = await this.userService.countAll();
        resBuilder(res, StatusCode.OK, Message.DataLoaded, userCount, users)
    }

    @Get(':id')
    async getOne(@Res() res: Response, @Param('id') id: number) {
        const user = await this.userService.getOne(res, id)
        resBuilder(res, StatusCode.OK, Message.DataLoaded, user)
    }

    @Post('')
    async create(@Res() res: Response, @Body() userDto: UserDto) {
        try {
            const user = await this.userService.create(res, userDto);
            resBuilder(res, StatusCode.OK, Message.DataAdded, user);
        } catch (err) {
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.Conflict, Message.DataAlreadyExist)
            }
        }
    }

    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() userDto: UserDto) {
        try {
            const user = await this.userService.update(res, id, userDto)
            resBuilder(res, StatusCode.OK, Message.DataUpdated, user)
        } catch (err) {
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded)
            }
        }
    }

    @Delete(':id')
    async destroy(@Res() res: Response, @Param('id') id: number) {
        try {
            await this.userService.destroy(res, id);
            const count = await this.userService.countAll();
            resBuilder(res, StatusCode.OK, Message.DataRemoved, count)
        } catch (err) {
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded)
            }
        }
    }

}