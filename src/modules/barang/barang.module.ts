import { Module } from '@nestjs/common';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang])],
  controllers: [BarangController],
  providers: [BarangService]
})
export class BarangModule {}
