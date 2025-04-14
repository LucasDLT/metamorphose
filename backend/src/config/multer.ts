import multer from "multer";
import { Request } from "express";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { UploadApiOptions } from "cloudinary";
import cloudinary from "./cloudinary";

// Define los parámetros específicos para Cloudinary
type CloudinaryParams = Partial<UploadApiOptions> & {
  folder: string;
  public_id: (req: Request, file: Express.Multer.File) => string;
  overwrite?: boolean;
  invalidate?: boolean;
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "metamorphose",
    allowed_formats: ["jpeg", "png", "jpg"], // Usa allowed_formats para TypeScript
    overwrite: true,
    invalidate: true,
    public_id: (req: Request, file: Express.Multer.File): string => {
      const uniqueSuffix = Date.now();
      return `${file.originalname.split(".")[0]}-${uniqueSuffix}`;
    },
  } as CloudinaryParams, // Asegura el tipado correcto
});

const upload = multer({ storage });
export default upload;
