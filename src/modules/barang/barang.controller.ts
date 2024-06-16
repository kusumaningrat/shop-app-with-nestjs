import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BarangDto } from './dto/barang.dto';
import { BarangService } from './barang.service';

@Controller('/api/v1/barang/')
export class BarangController {

    constructor(private readonly barangService: BarangService) {}

    @Get('')
    async getAll() {
        const barang = await this.barangService.getAll();
        const count = await this.barangService.countAll();
        return {
            'message': 'Berhasil load data',
            count,
            'data': barang
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        const barang = await this.barangService.getOne(id);
        return {
            'message': 'Berhasil load data',
            'data': barang
        }
    }

    @Post('')
    async create(@Body() barangDto: BarangDto) {
        const barang = await this.barangService.create(barangDto);
        return {
            'message': 'Berhasil menambahkan barang',
            'data': barang
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() barangDto: BarangDto ) {
        const barang = await this.barangService.update(id, barangDto);
        return {
            'message': 'Berhasil update barang',
            'data': barang
        }
    }

    @Delete(':id')
    async destroy(@Param('id') id: number) {
        await this.barangService.destroy(id);
        const count = await this.barangService.countAll();
        return {
            'message': 'Berhasil delete barang',
            count
        }
    }
}
