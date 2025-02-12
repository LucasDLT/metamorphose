import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/user.t";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/user";

//instanciamos el repositorio
const userRepository = AppDataSource.getRepository(User);

// Middleware para proteger las rutas que requieren autenticación
export const authenticateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Buscar el token en las cabeceras de la solicitud
  const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";
  // Si no se proporciona un token, retornamos un error 401
  if (!token) {
    res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    // Verificar y decodificar el token de forma sincrónica
    const decoded = jwt.verify(token, "mi_clave_secreta") as {
      id: number;
      email: string;
    };
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ message: "Usuario no encontrado." });
    }

    // Agregar la información del usuario a la solicitud
    req.user = user as User;
    next();
  } catch (error) {
    res.status(401).json({ message: "Acceso denegado. Token inválido." });
  }
};
