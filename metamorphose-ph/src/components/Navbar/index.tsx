"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context, ICategory } from "@/context/context";
import { toast } from "sonner";
import { SelectCategory } from "../selectCategory";

export default function Navbar() {
  const router = useRouter();
  const { token, setToken, setCategory, category, setSelectedCategory } =
    useContext(Context);

  const logOut = () => {
    toast.warning("Adios!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        height: "20px",
        width: "200px",
        backgroundColor: "#6666662f",
        fontFamily: " afacad",
      },
    });
    setToken(null);
    router.push("/");
  };
  const handleCategoryChange = (selectedCategory: ICategory | null) => {
    if (selectedCategory !== null) {
      setSelectedCategory(selectedCategory);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <nav className="flex flex-col justify-center items-center text-xs text-white p-1 m-2 gap-4 text-right fixed z-50 top-[50%] right-[0%] tracking-wide font-afacad ">
      {token && (
        <div className="transform transition hover:translate-x-[-10%] duration-500 ease-in-out ">
          <Link href={"/"} onClick={logOut}>
            LOGOUT
          </Link>
        </div>
      )}
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
        <div className="">
          <SelectCategory
            style={{color: 'white', backgroundColor: 'transparent', outline: 'none', width: '80%', padding:'5px', letterSpacing: '0.5px'}}
            onChange={handleCategoryChange}
          />
        </div>
      )}
    </nav>
  );
}
