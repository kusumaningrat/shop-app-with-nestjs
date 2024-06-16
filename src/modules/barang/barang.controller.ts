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

@Controller('/api/v1/barang/')
export class BarangController {

    constructor(private readonly barangService: BarangService) {}

    @Get('')
    async getAll(@Res() res: Response) {
        const barang = await this.barangService.getAll();
        const count = await this.barangService.countAll();
        resBuilder(res, StatusCode.OK, Message.DataLoaded, count, barang)
    }

    @Get(':id')
    async getOne(@Res() res: Response, @Param('id') id: number) {
        const barang = await this.barangService.getOne(id);
        resBuilder(res, StatusCode.OK, Message.DataLoaded, barang)
    }

    @Post('')
    async create(@Res() res: Response, @Body() barangDto: BarangDto) {
        const barang = await this.barangService.create(barangDto);
        resBuilder(res, StatusCode.Created, Message.DataAdded, barang)
    }

    @Put(':id')
    async update(@Res() res: Response, @Param('id') id: number, @Body() barangDto: BarangDto ) {
        const barang = await this.barangService.update(id, barangDto);
        resBuilder(res, StatusCode.OK, Message.DataUpdated, barang)
    }

    @Delete(':id')
    async destroy(@Res() res: Response, @Param('id') id: number) {
        await this.barangService.destroy(id);
        const count = await this.barangService.countAll();
        resBuilder(res, StatusCode.OK, Message.DataRemoved, count)
    }
}
