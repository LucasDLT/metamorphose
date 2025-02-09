import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mail {
    @PrimaryGeneratedColumn()    
    id: number

    @Column({length:30})
    name: string

    @Column({length:40})
    email: string

    @Column({length:25})
    phone: string

    @Column({length:500})
    message: string
}