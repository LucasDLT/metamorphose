import { Image } from "../types/image.t";

// Array en memoria para simular la base de datos
let images: Image[] = [];

// Función para crear una nueva imagen
export const createImage = (imageData: Omit<Image, "id" | "createdAt">): Image => {
  const newImage: Image = {
    id: images.length + 1,  // Se asigna un ID simple
    ...imageData,
    createdAt: new Date().toISOString(),  // Establecer la fecha de creación
  };
  images.push(newImage);
  return newImage;
};

// Función para obtener todas las imágenes
export const getAllImages = (): Image[] => {
  return images;
};

// Función para obtener una imagen por su ID
export const getImageById = (id: number): Image | undefined => {
  return images.find((image) => image.id === id);
};

// Función para actualizar una imagen
export const updateImage = (id: number, updatedData: Partial<Image>): Image | undefined => {
  const index = images.findIndex((image) => image.id === id);
  if (index === -1) return undefined;

  const updatedImage = { ...images[index], ...updatedData };
  images[index] = updatedImage;
  return updatedImage;
};

// Función para eliminar una imagen
export const deleteImage = (id: number): boolean => {
  const index = images.findIndex((image) => image.id === id);
  if (index === -1) return false;

  images.splice(index, 1);  // Elimina la imagen del array
  return true;
};
