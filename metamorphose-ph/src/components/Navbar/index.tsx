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
    <nav>
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
