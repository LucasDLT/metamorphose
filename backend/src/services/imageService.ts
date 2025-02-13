import { AppDataSource } from "../config/data-source";
import { Image } from "../models/image";
// Array en memoria para simular la base de datos
let imageRepository= AppDataSource.getRepository(Image);

// Función para crear una nueva imagen
export const createImage = (imageData: Omit<Image, "id" | "createdAt">): Promise<Image> => {
  const newImage = imageRepository.create(imageData);
  return imageRepository.save(newImage);


}
// Función para obtener todas las imágenes
export const getAllImages = async ():Promise <Image[]> => {
  return await imageRepository.find();
};

// Función para obtener una imagen por su ID
export const getImageById = async (id: number, updatedData: Partial<Image>):Promise <Image | null> => {
  return await imageRepository.findOneBy({ id });
};

// Función para actualizar una imagen
export const updateImage = async (id: number, updatedData: Partial<Image>):Promise <Image | null> => {
  const image = await imageRepository.findOneBy({ id });
  if (!image) return null;

  Object.assign(image, updatedData);
  return await imageRepository.save(image);
};

// Función para eliminar una imagen
export const deleteImage = async (id: number):Promise <boolean> =>{
  const index = await imageRepository.delete(id);
  return index.affected !== 0;

};
