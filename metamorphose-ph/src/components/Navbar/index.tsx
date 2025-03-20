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
    <nav className="gap-1 grid text-xs p-4 my-8 mx-8 text-right top-0 right-0 absolute border-2 border-gray-500">
      {!token && (
        <div>
          <Link href={"/forms"}>FORMULARIOS</Link>
        </div>
      )}

      <div>
        <Link href={"/"}>INICIO</Link>
      </div>

      {token && (
        <div>
          <Link href={"/navegacion"}>PANEL</Link>
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
