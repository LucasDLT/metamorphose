import { Request, Response } from "express";
import { Image } from "../models/image";
import { createImage, getAllImages, getImageById, updateImage, deleteImage } from "../services/imageService";
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
  const { title, history, url, active} = req.body;

  if (!title || !history || !url) {
     res.status(400).json({ message: "Título, historia y URL son requeridos." });
  }

  try {
    const newImage = await createImage({ title, history, url, active });
    res.status(201).json({ message: "Foto subida con éxito.", photo: newImage });
  } catch (error) {
    res.status(500).json({ message: "Error al subir la foto." });
  }
};

// Actualizar una foto existente
export const updatePhoto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, history, url } = req.body;

  try {
    const updatedImage = await updateImage(parseInt(id), { title, history, url });

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
