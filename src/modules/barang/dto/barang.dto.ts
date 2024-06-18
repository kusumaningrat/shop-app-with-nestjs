import { IsNotEmpty, IsString } from "class-validator";

export class BarangDto {

    id: number

    @IsNotEmpty()
    @IsString()
    nama_barang: string

    @IsNotEmpty()
    @IsString()
    deskripsi: string

    @IsNotEmpty()
    harga: number
    
    @IsNotEmpty()
    stok: number

    terjual: number

    sisa: number
}