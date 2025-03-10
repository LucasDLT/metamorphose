"use client";
import { useState } from "react";
import { validateForm } from "@/helpers/validate";
import { Ierror } from "@/types/error.t";
import { Iuser } from "@/types/user.t";

export default function FormRegister() {
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
        
      return alert("hay errores en el formulario");
      
    }
    const {confirmPassword, ...formData} = form;
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
        alert("Error al registrarse. Por favor, intenta de nuevo.");
    }
  };

  return (
    <form id="formRegister" onSubmit={handleSubmit} method="post">
      <label className="text-white">FormRegister</label>
      <div>
        <label >EMAIL</label>
        <input
          type="text"
          value={form.email}
          name="email"
          placeholder="email"
          onChange={handleChange}
          className="text-black"
        />
        {errors.email ? <p className="text-red">{errors.email}</p> : "*"}
      </div>
      <div>
        <label >CHAVE DE ACESSO</label>
        <input
          type="text"
          value={form.password}
          name="password"
          placeholder="Chave de acesso"
          onChange={handleChange}
          className="text-black"
        />
        {errors.password ? <p className="text-red">{errors.password}</p> : "*"}
      </div>
      <div>
        <label >CONFIRMAR CHAVE DE ACESSO</label>
        <input
          type="text"
          value={form.confirmPassword}
          name="confirmPassword"
          placeholder="confirmar chave"
          onChange={handleChange}
          className="text-black"
        />
        {errors.password ? <p className="text-red">{errors.password}</p> : "*"}
      </div>
      <button>ENTRAR</button>
    </form>
  );
}
