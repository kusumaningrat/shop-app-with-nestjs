import { 
    Body, 
    Controller, 
    Delete, Get, 
    Param, Post, Put, 
    Res
} from '@nestjs/common';
import { Response } from 'express';
import { BarangDto } from './dto/barang.dto';
import { BarangService } from './barang.service';
import { resBuilder } from 'src/commons/utils';
import { Message, StatusCode } from 'src/commons/constants';
import { CustomError } from 'src/commons/customError';

@Controller('/api/v1/barang/')
export class BarangController {

    constructor(private readonly barangService: BarangService) {}

    @Get('')
    async getAll(@Res() res: Response) {
        const barang = await this.barangService.getAll();
        const count = await this.barangService.countAll();
        return resBuilder(res, StatusCode.OK, Message.DataLoaded, count, barang)
    }

    @Get(':id')
    async getOne(@Res() res: Response, @Param('id') id: number) {
        const barang = await this.barangService.getOne(res, id);
        return resBuilder(res, StatusCode.OK, Message.DataLoaded, barang)
    }

    @Post('')
    async create(@Res() res: Response, @Body() barangDto: BarangDto) {
        try {
            const barang = await this.barangService.create(res, barangDto);
            return resBuilder(res, StatusCode.Created, Message.DataAdded, barang)
        } catch(err) {
            if (err instanceof CustomError){
                return resBuilder(res, StatusCode.Conflict, Message.DataAlreadyExist)
            }
        }
    }

    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() barangDto: BarangDto ) {
        try {
            const user = await this.barangService.update(res, id, barangDto)
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
            await this.barangService.destroy(res, id);
            const count = await this.barangService.countAll();
            return resBuilder(res, StatusCode.OK, Message.DataRemoved, count)
        } catch (err) {
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded)
            }
        }
    }
}
