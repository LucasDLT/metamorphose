import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest, User } from "../types/user.t";

// Middleware para proteger las rutas que requieren autenticación
export const authenticateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  // Buscar el token en las cabeceras de la solicitud
  const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";
  // Si no se proporciona un token, retornamos un error 401
  if (!token) {
     res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  // Verificar si el token es válido
  jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token no válido. Acceso denegado." });
    }
    const user = decoded as User;  // Hacemos el cast a `User`
    // Si el token es válido, agregamos la información del usuario al objeto req
    req.user = user ; // Almacenamos el usuario dentro del objeto req
    next(); // Continuamos a la siguiente función (en este caso, la ruta protegida)
  });
};
