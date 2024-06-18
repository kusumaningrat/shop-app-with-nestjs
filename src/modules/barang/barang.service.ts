import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barang } from './barang.entity';
import { Repository } from 'typeorm';
import { BarangDto } from './dto/barang.dto';
import { Response } from 'express';
import { resBuilder } from 'src/commons/utils';
import { Message, StatusCode } from 'src/commons/constants';
import { IfEmptyThrowError, IfNotEmptyThrowError } from 'src/commons/checks';
import { CustomError } from 'src/commons/customError';

@Injectable()
export class BarangService {

    constructor(
        @InjectRepository(Barang) private readonly barangRepository: Repository<Barang>
    ){}

    async getAll(): Promise<Barang[]> {
        
        return await this.barangRepository.find();
    }

    async getOne(@Res() res: Response, id: number): Promise<Barang> | null {
        try {
            const barang = await this.barangRepository.findOne({ where: { id }});
            IfEmptyThrowError(barang, Message.DataFailLoaded)
            return barang
        } catch (err) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async countAll(): Promise<Number> {
        return await this.barangRepository.count();
    }

    async create(@Res() res: Response, barangDto: BarangDto): Promise<Barang> {
        try {
            const check = await this.barangRepository.findOne({ where: { nama_barang: barangDto.nama_barang }})

            const barangObj = {
                id: barangDto.id,
                nama_barang: barangDto.nama_barang,
                deskripsi: barangDto.deskripsi,
                harga: barangDto.harga,
                stok: barangDto.stok,
                terjual: barangDto.terjual,
                sisa: barangDto.sisa
            }

            IfNotEmptyThrowError(check, Message.DataAlreadyExist);
            const barang =  await this.barangRepository.save(barangObj);
            return barang;
        } catch (err) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.Conflict, Message.DataAlreadyExist);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async update(@Res() res: Response, id: number, barangDto: Partial<Barang>): Promise<Barang | null> {

        try {
            const barang = await this.barangRepository.findOne({ where: { id }});
            IfEmptyThrowError(barang, Message.DataFailLoaded)

            barangDto = { ...barangDto, id };
            await this.barangRepository.update(id, barangDto )

            return await this.barangRepository.findOne({ where: { id }});
        } catch ( err ) {
            console.log(err)
            if (err instanceof CustomError) {
                resBuilder(res, StatusCode.NotFound, Message.DataFailLoaded);
            } else {
                resBuilder(res, StatusCode.InternalServerError, Message.InternalError)
            }
        }
    }

    async destroy(@Res() res: Response, id: number): Promise<Barang> {
        const barang = await this.barangRepository.findOne({ where: { id: id }});
        try {
            IfEmptyThrowError(barang, Message.DataFailLoaded)
            await this.barangRepository.delete(id);
            return barang;
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