import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types/user.t";
import { mockAdmin } from "../data/mockAdmin";

//funcion para verificar las credenciales del login

export const loginAdmin = (email: string, password: string) => {
  return new Promise<{ token: string; message: string }>((resolve, reject) => {
    if (email !== mockAdmin.email) {
      return reject("correo electronico incorrecto");
    }

    //comparacion de la contraseña hasheada

    bcrypt.compare(password, mockAdmin.password, (err, isMatch) => {
      if (err) {
        return reject("contraseña incorrecta");
      }
      if (!isMatch) {
        return reject("contraseña incorrecta");
      }
      // si las credneciales son correctas, generamos un token JWT

      const token = jwt.sign(
        { email: mockAdmin.email, id: 1 }, //ya que solo existe un admin
        "mi_clave_secreta", //clave secreta para el JWT
        { expiresIn: "1h" }
      );
      resolve({ token, message: "login exitoso" });
    });
  });
};

// Función para registrar a un nuevo admin (mock)
export const registerAdmin = (email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      if (email === mockAdmin.email) {
        return reject("El admin ya está registrado");
      }
  
      // Si fuera otro usuario, hash de la contraseña y "guardar" en la base de datos
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return reject("Error al registrar el usuario");
        }
  
        // Creamos un nuevo usuario (esto en la vida real sería guardado en una base de datos)
        const newUser: User = {
          id: 1, // ID manual, podría ser autogenerado en la base de datos
          email,
          password: hashedPassword,
        };
  
        resolve(newUser);
      });
    });
  };