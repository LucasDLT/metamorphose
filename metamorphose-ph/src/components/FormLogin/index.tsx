"use client";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validation/loginSchema";
import { Inputs } from "@/types/typeErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/context/context";


export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });
  

  const {setToken} =useContext(Context);

  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  async function postForm(data: Inputs) {
    console.log(data);

    try {
      const response = await fetch(`${PORT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error en la solicitud", errorResponse);
        throw new Error("Hubo un error en la solicitud");
      }
      const dataLogin = await response.json();
      console.log("login", dataLogin.token);
      localStorage.setItem("token-admin", dataLogin.token);
      setToken({token:dataLogin.token});
      router.push("/");
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error en el login, vuelve a intentarlo");
    }
  }

  return (
    <form onSubmit={handleSubmit(postForm)}>
      <div className="text-black">
        {/*como aca estoy usando react hook form, no es necesario que coloque la propiedad name, si la agrego me arroja error. Esta propiedad viene en la funcion register*/}
        <label className="text-white" htmlFor="email">
          Email
        </label>
        <input type="email" id="email" {...register("email")} />
        {errors.email?.message && (
          <p className="text-white">{errors.email?.message}</p>
        )}
      </div>
      <div className="text-black">
        <label className="text-white" htmlFor="password">
          Password
        </label>
        <input type="text" id="password" {...register("password")} />
        {errors.password?.message && (
          <p className="text-white">{errors.password?.message}</p>
        )}
      </div>
      <button>Login</button>
    </form>
  );
}
