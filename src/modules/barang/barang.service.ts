import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Barang } from './barang.entity';
import { Repository } from 'typeorm';
import { BarangDto } from './dto/barang.dto';

@Injectable()
export class BarangService {

    constructor(
        @InjectRepository(Barang) private readonly barangRepository: Repository<Barang>
    ){}

    async getAll(): Promise<Barang[]> {
        
        return await this.barangRepository.find();
    }

    async getOne(id: number): Promise<Barang> {
        const barang = await this.barangRepository.findOne({ where: { id }});
        if (!barang) {
            throw new NotFoundException('Barang tidak ada');
        }
        return barang
    }

    async countAll(): Promise<Number> {
        return await this.barangRepository.count();
    }

    async create(barangDto: BarangDto): Promise<Barang> {
        
        try {
            const checkExistingBarang = await this.barangRepository.findOne({ where: { nama_barang: barangDto.nama_barang }});

            if (checkExistingBarang) {
                throw new ConflictException('Barang sudah ada');
            }

            const barangObj = {
                id: barangDto.id,
                nama_barang: barangDto.nama_barang,
                deskripsi: barangDto.deskripsi,
                harga: barangDto.harga,
                stok: barangDto.stok,
                terjual: barangDto.terjual,
                sisa: barangDto.sisa
            }

            const barang = await this.barangRepository.save(barangObj);

            return barang
        } catch (err) {
            console.log(err);
            throw new InternalServerErrorException();
        }
    }

    async update(id: number, barangDto: Partial<Barang>): Promise<Barang> {

        try {
            const barang = await this.barangRepository.findOne({ where: { id: id }});
            if (!barang) {
                throw new NotFoundException('Barang tidak ada');
            }

            await this.barangRepository.update(id, { ...barangDto })

            return await this.barangRepository.findOne({ where: { id: id }});
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException()
        }
    }

    async destroy(id: number): Promise<Barang> {
        const barang = await this.barangRepository.findOne({ where: { id: id }});
        if (!barang) {
            throw new NotFoundException('Barang tidak ada');
        }

        await this.barangRepository.delete(id);

        return barang;
    }

}