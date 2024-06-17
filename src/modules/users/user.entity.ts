import { Validate } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;
    
    @Column({ type: 'varchar', length: 255 })
    fullname: string;
    
    @Column({ type: 'varchar', length: 255 })
    username: string;
    
    @Column({ type: 'varchar', length: 255 })
    password: string;
}
