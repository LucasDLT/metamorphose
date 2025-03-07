"use client";
import { useState } from "react";
import { validateForm } from "@/helpers/validate";
import { Ierror } from "@/types/error.t";
import { Iuser } from "@/types/user.t";

export default function FormRegister() {
  const [form, setForm] = useState<Iuser>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Ierror>({});
  function handleChange(event: React.FocusEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

    setErrors(validateForm(form));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //aca tengo que hacer el post a futuro
  }

  return (
    <form id="formRegister" action="" onSubmit={handleSubmit} method="post">
      <label className="text-white">FormRegister</label>
      <div>
        <label htmlFor="">USUÁRIO</label>
        <input
          type="text"
          value={form.username}
          name="username"
          placeholder="Usuário"
          onChange={handleChange}
          className="text-black"
        />
        {errors.username ? <p className="text-red">{errors.username}</p> : "*"}
      </div>
      <div>
        <label htmlFor="">CHAVE DE ACESSO</label>
        <input
          type="password"
          value={form.password}
          name="password"
          placeholder="Chave de acesso"
          onChange={handleChange}
          className="text-black"
        />
        {errors.password ? <p className="text-red">{errors.password}</p> : "*"}
      </div>
      <button>ENTRAR</button>
    </form>
  );
}
