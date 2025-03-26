"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/context/context";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const { token, setToken } = useContext(Context);

  const logOut = () => {
    toast.warning("Adios!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        height: "20px",
        width: "200px",
        backgroundColor: "#6666662f",
        fontFamily:" afacad",

      },
    });
    setToken(null);
    router.push("/");
  };
  return (
    <nav className=" gap-1 grid text-xs text-gray-400  p-4 gap-3 text-right fixed z-50 top-44 right-6 font-afacad">
      {!token && (
        <div className=" transform hover:translate-x-[-10%] transition duration-500 ease-in-out">
          <Link href={"/forms"}>FORMULARIOS</Link>
        </div>
      )}

      <div className="transform hover:translate-x-[-10%] transition duration-500 ease-in-out">
        <Link href={"/"}>INICIO</Link>
      </div>

      {token && (
        <div className="trasnform hover:translate-x-[-10%] transition duration-500 ease-in-out">
          <Link href={"/navegacion"}>PANEL</Link>
        </div>
      )}

      {token && (
        <div className="transform transition hover:translate-x-[-10%] duration-500 ease-in-out">
          <Link href={"/"} onClick={logOut}>
            LOGOUT
          </Link>
        </div>
      )}
    </nav>
  );
}
