import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isUnique } from "src/commons/validator";

export class BarangDto {

    id: number

    @IsNotEmpty()
    @IsString()
    @isUnique({ tableName: 'barang', column: 'nama_barang' })
    nama_barang: string

    @IsNotEmpty()
    @IsString()
    deskripsi: string

    @IsNotEmpty()
    harga: number
    
    @IsNotEmpty()
    stok: number

    @IsEmpty()
    terjual: number

    @IsEmpty()
    sisa: number
}