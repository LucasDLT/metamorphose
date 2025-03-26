import { AppDataSource } from "../config/data-source";
import { Image } from "../models/image";
import { Category } from "../models/category";
// Array en memoria para simular la base de datos
let imageRepository= AppDataSource.getRepository(Image);
let categoryRepository= AppDataSource.getRepository(Category);


// Función para crear una nueva imagen
export const createImage = async (imageData: Omit<Image, "id" | "createdAt">): Promise<Image> => {
  let category = await categoryRepository.findOne({ where: { name: imageData.category.name } });
  
  if (!category) {
    category = categoryRepository.create({ name: imageData.category.name });
    await categoryRepository.save(category);
  }

  const newImage = imageRepository.create({ ...imageData, category });
  return imageRepository.save(newImage);

}
// Función para obtener todas las imágenes
export const getAllImages = async ():Promise <Image[]> => {
  return await imageRepository.find();
};

// Función para obtener una imagen por su ID
export const getImageById = async (id: number):Promise <Image | null> => {
  return await imageRepository.findOneBy({ id });
};

// Función para actualizar una imagen
export const updateImage = async (id: number, updatedData: Partial<Image>): Promise<Image | null> => {
  const image = await imageRepository.findOne({
    where: { id },
    relations: ["category"], // Asegura que trae la relación
  });

  if (!image) return null;

  // Verificar si se pasó una nueva categoría
  if (updatedData.category && typeof updatedData.category === "string") {
    let category = await categoryRepository.findOne({ where: { name: updatedData.category } });

    if (!category) {
      category = categoryRepository.create({ name: updatedData.category });
      await categoryRepository.save(category);
    }

    if (category.id !== image.category.id) {
      updatedData.category = category;
    }
  }
  if (!updatedData.categoryOrder) {
    updatedData.categoryOrder = image.categoryOrder
  }
  if (!updatedData.globalOrder) {
    updatedData.globalOrder = image.globalOrder
  }

  Object.assign(image, updatedData);
  console.log("datos actualizados", image);
  
   await imageRepository.save(image);

  return image;
};


// Función para eliminar una imagen
export const deleteImage = async (id: number):Promise <boolean> =>{
  const index = await imageRepository.delete(id);
  return index.affected !== 0;

}
