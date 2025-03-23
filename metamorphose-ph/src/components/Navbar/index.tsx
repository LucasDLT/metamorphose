"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Context } from "@/context/context";

export default function Navbar() {
  const router = useRouter();
  const { token, setToken } = useContext(Context);

  const logOut = () => {
    setToken(null);
    router.push("/");
  };
  return (
    <nav className="gap-1 grid text-xs p-4 gap-3 text-right fixed z-50 top-44 right-6 ">
      {!token && (
        <div className="trasform hover:scale-110">
          <Link href={"/forms"}>FORMULARIOS</Link>
        </div>
      )}

      <div className="trasform hover:scale-110 transition duration-500 ease-in-out">
        <Link href={"/"}>INICIO</Link>
      </div>

      {token && (
        <div className="trasform hover:scale-110 transition duration-500 ease-in-out">
          <Link href={"/navegacion"}>PANEL</Link>
        </div>
      )}

      {token && (
        <div className="trasform hover:scale-110 transition duration-500 ease-in-out">
          <Link href={"/"} onClick={logOut}>
            LOGOUT
          </Link>
        </div>
      )}
    </nav>
  );
}
