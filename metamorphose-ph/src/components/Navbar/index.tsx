"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "zod";
interface token {
  token: string;
}

export default function Navbar() {
  const [token, setToken] = useState<token | null>(null);
  const router = useRouter();
  useEffect(() => {

      const storedToken = localStorage.getItem("token-admin");
      if (storedToken) {
        setToken({ token: storedToken });
      }
    const handleStorageChange = () => {
        const updatedToken = localStorage.getItem("token-admin");
       setToken(updatedToken ? { token: updatedToken } : null);
}
window.addEventListener("storage", handleStorageChange);
return () => {
  window.removeEventListener("storage", handleStorageChange);
};
  }, []);

  const logOut = () => {
    localStorage.removeItem("token-admin");
    setToken(null);
    router.push("/");
  };
  return (
    <nav>
      <div>
        <Link href={"/forms"}>FORMULARIOS</Link>
      </div>
      {token && (
        <div>
          <Link href={"/carga"}>CARGA DE IMAGENES</Link>
          <Link href={"/multimedia"}>VISTA MULTIMEDIA</Link>
          <Link href={"/edicion"}>EDICION DE UBICACION</Link>
        </div>
      )}
      {token && (
        <div>
          <Link href={"/"} onClick={logOut}>
            LOGOUT
          </Link>
        </div>
      )}
    </nav>
  );
}
