import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barang {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: '100'})
    nama_barang: string

    @Column({ type: "varchar", length: '255'})
    deskripsi: string

    @Column({ type: "int"})
    harga: number

    @Column({ type: "int", default: 0 })
    stok: number

    @Column({ type: "varchar", length: '255'})
    kategory: string

    @Column({ type: "int", default: 0 })
    terjual: number

    @Column({ type: "int", default: 0 })
    sisa: number

    @Column({ type: 'boolean', default: false })
    status: boolean
}