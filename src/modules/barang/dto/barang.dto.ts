import { IsBoolean, IsEmpty, IsNumber, IsString } from "class-validator";

export class BarangDto {

    @IsEmpty()
    @IsNumber()
    id: number

    @IsEmpty()
    @IsString()
    nama_barang: string

    @IsEmpty()
    @IsString()
    deskripsi: string

    @IsEmpty()
    @IsNumber()
    harga: number
    
    @IsEmpty()
    @IsNumber()
    stok: number

    @IsEmpty()
    @IsString()
    kategori: string

    @IsEmpty()
    @IsNumber()
    terjual: number

    @IsEmpty()
    @IsNumber()
    sisa: number

    @IsBoolean()
    status: boolean
}