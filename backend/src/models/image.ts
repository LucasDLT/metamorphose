import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "./category";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 500 })
  history: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ default: true })
  active: boolean; // esta propiedad es para que el admin pueda ocultar las imagenes, asi puede subir imagenes y dejarlas ocultas de los visitantes.

  
  // Relación con categorías (muchas imágenes pueden tener una categoría)
  @ManyToOne(() => Category, (category) => category.images, { eager: true })
  category: Category;
}
