import { Request, Response } from "express";
import { loginAdmin, registerAdmin } from "../services/authService";

//controlador para el login de metamorphose
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email y contraseña son requeridos" });
    return;
  }

  try {
    const { token, message } = await loginAdmin(email, password);
    res.json({ message, token });
  } catch (err) {
    console.error("error en login",err);
    res.status(400).json({ message: err });
  }
};

//controlador para el registro de metamorphose

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email y contraseña son requeridos" });
    return;
  }
  try {
    const newUser = await registerAdmin(email, password);
    res
      .status(201)
      .json({ message: "usuario registrado con exito", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
