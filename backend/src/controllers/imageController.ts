import { Request, Response } from "express";
import { createImage, getAllImages, getImageById, updateImage, deleteImage, deleteImageFromCloudinary } from "../services/imageService";
import { v2 as cloudinary } from 'cloudinary';

import { createCategory } from "../services/categoryService";
import { getNextGlobalOrderNumber, getNextOrderNumberInCategory } from "../services/orderImageService";
import { swapCategoryOrder, swapGlobalOrder } from "../services/reorderImageService";
import { log } from "console";


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
      const publicId = result?.public_id;
      
      if (!imageUrl) {
        console.error("No se encontró URL en el resultado de Cloudinary.");
        res.status(500).json({ message: "Error al subir la foto, no se encontró URL." });
        return;
      }
        // Verificar o crear la categoría antes de asignarla
        const categoryCreated = await createCategory(category);

        //numeros de orden en categoria y global
      const orderNumberInCategory = await getNextOrderNumberInCategory(categoryCreated.id)
      const orderNumberGlobal = await getNextGlobalOrderNumber()
      
    
      // Resto de la lógica para guardar la imagen en tu base de datos
const newImage = await createImage({ title, history, url: imageUrl, active, category: categoryCreated, categoryOrder: orderNumberInCategory, globalOrder: orderNumberGlobal, public_id: publicId ?? "" }); 
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
  const updatedFields = Object.fromEntries(
    Object.entries({
      title: req.body.title,
      history: req.body.history,
      active: req.body.active === 'true' || req.body.active === true,
      category: req.body.category,
    }).filter(([_, value]) => value !== undefined && value !== null)
  );


  try {
    const image = await getImageById(parseInt(id));
    if (!image) {
      res.status(404).json({ message: "Foto no encontrada." });
      return;
    }

    // Si hay una nueva imagen, eliminar la anterior de Cloudinary y subir la nueva
    if (req.file) {
      if (image.public_id) {
        console.log("Eliminando imagen previa de Cloudinary:", image.public_id);
        await deleteImageFromCloudinary(image.public_id);
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      updatedFields.url = result.secure_url;
      updatedFields.public_id = result.public_id;
    }

    const updatedImage = await updateImage(parseInt(id), updatedFields);

    const timestamp = Date.now();
    const imageUrlWithTimestamp = `${updatedImage?.url}?t=${timestamp}`;

    res.json({ message: "Foto actualizada con éxito.", photo: updatedImage });
  } catch (error) {
    console.error("Error al actualizar la foto:", error);
    res.status(500).json({ message: "Error al actualizar la foto." });
  }
};




// Eliminar una foto
export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const image = await getImageById(parseInt(id));
    
    if (!image) {
      res.status(404).json({ message: "Foto no encontrada." });
    }
    
    if (image?.public_id) {
      console.log("Public ID:", image.public_id);
      
      await deleteImageFromCloudinary(image.public_id);
    }
    
   // await deleteImageFromCloudinary(image!.public_id)


    const isDeleted = await deleteImage(parseInt(id));
    if (!isDeleted) {
      res.status(404).json({ message: "Foto no encontrada." });
    }
    const updatePhotos = await getAllImages();
    

    res.json({ message: "Foto eliminada con éxito.", photos: updatePhotos });

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la foto." });
  }
};

//cambio de orden en categorias
export const updateCategoryOrderPhoto = async( req: Request, res: Response):Promise<void>=>{
const {id1, id2}= req.body;

const imageId1 = parseInt(id1)
const imageId2 = parseInt(id2)


if (isNaN(imageId1)|| isNaN(imageId2)) {
  res.status(400).json({message:"error con los Ids de las imagenes. No estan siendo tomados como numeros enteros"}) 
}

if (!imageId1 || !imageId2) {
   res.status(400).json({message: "se requieren los Ids de ambas imagenes para intercambiar"})
}
try {
  const swappedImages = await swapCategoryOrder(imageId1, imageId2)
  res.status(200).json({message:"imagenes intercambiadas con exito", photos: swappedImages})
} catch (error) {
  res.status(500).json({message:"Error al intercambiar el orden de los imagenes"})
}
} 

//cambio de orden global

export const updateOrderGlobal = async(req:Request, res:Response):Promise<void>=>{
  const {id1, id2}=req.body

  const image1=parseInt(id1)
  const image2=parseInt(id2)

  if (isNaN(image1) || isNaN(image2)) {
    res.status(400).json({message:"error con los ids de las imagenes. No estan siendo tomados como numeros enteros"})
  }
  if (!image1 || !image2) {
    res.status(400).json({message:"se requieren los ids de ambas imagenes para intercambiar"})
  }
  try {
    const swappedGlobal= await swapGlobalOrder(image1, image2)
    res.status(200).json({message:"imagenes intercambiadas con exito", photos: swappedGlobal})
  } catch (error) {
    res.status(500).json({message:"Error al intercambiar el orden de las imagenes"})
  }

}


export const getPhotoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const photo = await getImageById(parseInt(id));
    if (!photo) {
       res.status(404).json({ message: "Foto no encontrada." });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la foto." });
  }
};