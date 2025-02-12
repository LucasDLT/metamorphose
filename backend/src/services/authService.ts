import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { User } from "../models/user";
import { AppDataSource } from "../config/data-source";

//Obtener el repositorio de usuarios asi interactuo con la BBD
const userRepository = AppDataSource.getRepository(User);

//aca tuve que promesificar bcrypt para poder usarlo con async y await
const compareAsync = promisify(bcrypt.compare);
const hashAsync = promisify(bcrypt.hash);

//funcion para verificar las credenciales del login

export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ token: string; message: string }> => {
  //aca buscamos al usuario por email en la BDD
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error("credenciales incorrectas");
  }
  //Comparar la contraseña ingresada con la almacanada osea Hasheada
  const isMatch = await compareAsync(password, user.password);
  if (!isMatch) {
    throw new Error("credenciales incorrectas");
  }
  //Generar el token
  const token = jwt.sign(
    { email: user.email, id: user.id },
    "mi_clave_secreta", //clave secreta para el JWT
    { expiresIn: "1h" }
  );
  return { token, message: "login exitoso" };
};

// Función para registrar a un nuevo admin (mock)
export const registerAdmin = async (
  email: string,
  password: string
): Promise<User> => {
  // Verificar si el email ya existe en la base de datos
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("El correo electrónica ya existe.");
  }

  // Hashear la contraseña
  const hashedPassword = await hashAsync(password, 10);

  // Guardar el nuevo admin en la base de datos
  const newUser = userRepository.create({
    email,
    password: hashedPassword,
  });
  //guardo el nuevo admin
  await userRepository.save(newUser);
  return newUser;
};
