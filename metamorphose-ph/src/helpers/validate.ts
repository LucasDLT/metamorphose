import { Iuser } from "../types/user.t";
import { Ierror } from "../types/error.t";

// Función para validar el formulario
export const validateForm = (form: Iuser): Ierror => {
  const errors: Ierror = {};

  // Expresiones regulares
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, una letra y un número
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar un correo electrónico

  // Validar 'email'
  if (!form.email) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  // Validar 'password'
  if (!form.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (!passwordRegex.test(form.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres, incluir al menos una letra y un número";
  }

  // Validar 'confirmPassword'
  if (form.confirmPassword && form.password?.trim() !== form.confirmPassword.trim()) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};
