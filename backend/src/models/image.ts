import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  @ PrimaryGeneratedColumn()  
  id: number

  @Column({length:100})  
  title: string

  @Column({length:500})     
  history: string

  @Column()
  url: string

  @Column()  
  createdAt: string

  @Column()
  active: boolean// esta propiedad es para que el admin pueda ocultar las imagenes, asi puede subir imagenes y dejarlas ocultas de los visitantes. 
}
