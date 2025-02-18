// types/express/index.d.ts
import * as express from "express";
import { User } from "./user.t";
import { UploadApiErrorResponse } from "cloudinary";

// Extender la interfaz Request de Express para agregar la propiedad `user`
declare global {
  namespace Express {
    interface MulterFile{
      secure_url: string;
      public_id: string;
    }
    interface Request {
      file?: MulterFile & UploadApiErrorResponse
      user?: User;  // El tipo `user` puede ser más específico, por ejemplo, `User`, si lo deseas
    }
  }
}
