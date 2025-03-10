import {z} from "zod";

export const loginSchema = z.object({
    email: z.string()
    .email({message:"debes ingresar un correo electronico valido"}),
    password: z.string()
    .min(8,{message:"debes ingresar al menos 8 caracteres"})
})