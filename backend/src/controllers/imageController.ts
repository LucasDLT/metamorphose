import { Request, Response } from "express";
import { createImage, getAllImages, getImageById, updateImage, deleteImage } from "../services/imageService";
import { v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/category";
import { createCategory } from "../services/categoryService";

let categoryRepository = AppDataSource.getRepository(Category);

// Obtener todas las fotos del admin
export const getAdminPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const photos = await getAllImages(); // Ahora usa la función para obtener las imágenes
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las fotos del admin." });
  }
};

// Subir una nueva foto
export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  console.log("Solicitud recibida en uploadPhoto")
  const { title, history, category} = req.body;
  console.log("Enviando archivo:", req.file);
  
  const active = req.body.active==="true"
  
  if (!title || !history  || !req.file ) {
    console.log("Faltan campos obligatorios:", { title, history, file: req.file });
    res.status(400).json({ message: "Título, historia y archivo de imagen son requeridos." });
    return
  }

  try {
    console.log("Archivo recibido:", req.file);
    if (!req.file) {
      res.status(400).json({ message: "Archivo de imagen no proporcionado." });
      return;
    }
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
      if (error) {
        console.error("Error al subir la foto:", JSON.stringify(error, null, 2));
        res.status(500).json({ message: "Error al subir la foto." });
        return;
      }
      console.log("Resultado de Cloudinary:", JSON.stringify(result, null, 2));
    
      // Aquí el resultado debe contener la URL de la imagen subida
      const imageUrl = result?.secure_url;
      console.log("URL de la imagen:", imageUrl);
      
      if (!imageUrl) {
        console.error("No se encontró URL en el resultado de Cloudinary.");
        res.status(500).json({ message: "Error al subir la foto, no se encontró URL." });
        return;
      }
        // Verificar o crear la categoría antes de asignarla
        const categoryCreated = await createCategory(category);
      
    
      // Resto de la lógica para guardar la imagen en tu base de datos
      const newImage = await createImage({ title, history, url: imageUrl, active, category: categoryCreated });
      console.log("Nueva imagen creada:", JSON.stringify(newImage, null, 2));
      res.status(201).json({ message: "Foto subida con éxito.", photo: newImage });
    });
    
  } catch (error) {
    console.error("Error en el proceso de subida:", error);
    res.status(500).json({ message: "Error al subir la foto." });
  }
};

// Actualizar una foto existente
export const updatePhoto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, history, url, active, category } = req.body;

  try {
    const updatedImage = await updateImage(parseInt(id), { title, history, url, active, category });

    if (!updatedImage) {
       res.status(404).json({ message: "Foto no encontrada." });
    }

    res.json({ message: "Foto actualizada con éxito.", photo: updatedImage });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la foto." });
  }
};

// Eliminar una foto
export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const isDeleted = await deleteImage(parseInt(id));

    if (!isDeleted) {
       res.status(404).json({ message: "Foto no encontrada." });
    }

    res.json({ message: "Foto eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la foto." });
  }
};
