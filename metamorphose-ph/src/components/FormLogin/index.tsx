"use client";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validation/loginSchema";
import { Inputs } from "@/types/typeErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/context/context";

interface FormLoginProps {
  setToggle:React.Dispatch<React.SetStateAction<boolean>>
}
export const FormLogin:React.FC<FormLoginProps> = ( {setToggle}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const { setToken } = useContext(Context);

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
      setToken({ token: dataLogin.token });
      router.push("/");
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error en el login, vuelve a intentarlo");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(postForm)}
      className="grid justify-center mx-auto p-4 w-64 bg-gradient-to-t from-zinc-900 to-black-900 rounded-lg"
    >
      <label className="text-white text-center m-6">LOGIN</label>

      <label className="text-white text-xs" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        className="rounded text-black"
      />
      {errors.email ? (
        <p className="text-red-500 text-xs">{errors.email?.message}</p>
      ) : (
        <p className="text-white text-xs">*</p>
      )}

      <label className="text-white text-xs " htmlFor="password">
        PASSWORD
      </label>
      <input
        type="text"
        id="password"
        {...register("password")}
        className="rounded text-black"
      />
      {errors.password?.message ? (
        <p className="text-red-500 text-xs">{errors.password?.message}</p>
      ) : (
        <p className="text-white text-xs">*</p>
      )}
      <button className="text-white text-sm hover:bg-gray-600 m-auto w-32 my-4">sign in</button>
      <h3 className="text-xs text-white text-center">
        ¿no estas registrado? hacelo
        <button type="button" className="text-blue-500 m-1" onClick={() => setToggle(true)}>
          aqui
        </button>
      </h3>
      <h4 className="text-xs text-white text-center">
        campos marcados con (*) son obligatorios
      </h4>
    </form>
  );
}
