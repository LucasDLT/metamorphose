import { ReactHTMLElement } from "react";
import { Iuser } from "../types/user.t";
import { Ierror } from "../types/error.t";

export const validateForm = ( form: Iuser): Ierror => {
  const errors: Ierror = { }

  if(!form.username) {
    errors.username = "você tem que digitar seu nome de usuário"
  }

  if(!form.password) {
    errors.password = "você tem que digitar uma senha"
  }
  
  return errors
  
};