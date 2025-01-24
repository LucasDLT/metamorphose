// types/express/index.d.ts
import * as express from "express";
import { User } from "./user.t";

// Extender la interfaz Request de Express para agregar la propiedad `user`
declare global {
  namespace Express {
    interface Request {
      user?: User;  // El tipo `user` puede ser más específico, por ejemplo, `User`, si lo deseas
    }
  }
}
