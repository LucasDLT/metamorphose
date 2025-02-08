import { Request, Response } from "express";
import { sendEmail } from "../services/contactService";

export const emailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      res.status(400).json({ message: "Todos los campos son requeridos." });
    }
    const response = await sendEmail(name, email, phone, message);

    if (response.success) {
      res.status(200).json({ message: response.message });
    } else {
      res.status(500).json({ message: response.message });
    }
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};
