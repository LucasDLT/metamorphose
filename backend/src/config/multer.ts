import multer from "multer";
import { Request } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UploadApiOptions } from "cloudinary";
import cloudinary from "./cloudinary";

// Define los parámetros específicos para Cloudinary
interface CloudinaryParams extends UploadApiOptions {
  folder: string;
  public_id: any
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "metamorphose",
    allowed_formats: ["jpeg", "png", "jpg"], // Usa allowed_formats para TypeScript
    public_id: (req: Request, file: Express.Multer.File): string => {
      return file.originalname.split(".")[0];
    },
  } as CloudinaryParams, // Asegura el tipado correcto
}); 

const upload = multer({ storage });
export default upload;