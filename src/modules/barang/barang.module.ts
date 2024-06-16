import { Module } from '@nestjs/common';
import { BarangController } from './barang.controller';

@Module({
  controllers: [BarangController]
})
export class BarangModule {}
