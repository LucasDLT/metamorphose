import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Image} from "./image";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true}) 
    name: string;

    @OneToMany(() => Image, (image) => image.category)
    images: Image[]
}





  