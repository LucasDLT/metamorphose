"use client";
import { useState } from "react";
import { validateForm } from "@/helpers/validate";
import { Ierror } from "@/types/error.t";
import { Iuser } from "@/types/user.t";
interface IformRegisterProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormRegister:React.FC<IformRegisterProps>=({setToggle})=> {
  const [form, setForm] = useState<Iuser>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Ierror>({});

  const PORT = process.env.NEXT_PUBLIC_API_URL;

  function handleChange(event: React.FocusEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //aca tengo que hacer el post a futuro
    setErrors(validateForm(form));

    if (Object.keys(errors).length) {
      console.log(errors);

      return
    }
    const { confirmPassword, ...formData } = form;
    try {
      const response = await fetch(`${PORT}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error en la solicitud:", errorResponse);
        throw new Error("Hubo un error en la solicitud");
      }
      const data = await response.json();
      console.log("registro: ", data);
    } catch (error) {
      console.error("Error al registrarse: ", error);
    }
  };

  return (
    <form
      id="formRegister"
      onSubmit={handleSubmit}
      method="post"
      className="grid justify-center mx-auto p-4 w-64 bg-gradient-to-t from-zinc-900 to-black-900 rounded-lg"
    >
      <label className="text-white text-center p-4">REGISTRATE</label>

      <label className="text-xs">EMAIL</label>
      <input
        type="text"
        value={form.email}
        name="email"
        placeholder=""
        onChange={handleChange}
       className="rounded text-black"
      />
      {errors.email ? <p className="text-red-500 text-xs">{errors.email}</p> : <p className="text-white text-xs">*</p>}

      <label className="text-xs">CONTRASEÑA</label>
      <input
        type="text"
        value={form.password}
        name="password"
        placeholder=""
        onChange={handleChange}
        className="rounded text-black"
      />
      {errors.password ? <p className="text-red-500 text-xs">{errors.password}</p> : <p className="text-white text-xs">*</p>}

      <label className="text-xs">CONFIRMAR</label>
      <input
        type="text"
        value={form.confirmPassword}
        name="confirmPassword"
        placeholder=""
        onChange={handleChange}
        className="rounded text-black"
      />
      {errors.password ? (
        <p className="text-red-500 text-xs">{errors.password}</p>
      ) : (
        <p className="text-white text-xs">*</p>
      )}

      <button className="text-white text-sm hover:bg-gray-600 m-auto w-32 my-4">
        registrarse
      </button>
      <h3 className="text-xs text-white text-center">
        ¿Ya tenes cuenta? directamente logueate 
        <button type="button" className="text-blue-500 m-1" onClick={() => setToggle(false)}>aqui</button>
      </h3>
      <h4 className="text-xs text-white text-center">
        campos marcados con (*) son obligatorios
      </h4>
    </form>
  );
}
