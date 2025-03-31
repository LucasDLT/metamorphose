'use client';
import Link from "next/link";
import { useContext } from "react";
import { Context } from "@/context/context";
const Layout = ({ children, }: Readonly <{ children: React.ReactNode }>) => {
  const {setSelected, selected} = useContext(Context)

  const handleSelect =()=>setSelected(true)
  const handleDeselect =()=>setSelected(false)

  return (
    <div className="max-w-screen-xl max-h-full font-afacad flex justify-center absolute top-52 left-32 p-3 right-32 bg-gradient-to-b from-zinc-900 to-black-900 rounded">
      <nav className=" flex flex-row justify-evenly text-xs fixed top-40 left-32 ml-1 p-3 right-32 -mr-1.5 z-50 backdrop-blur-lg ">
        <Link className=" hover:text-gray-300 transform hover:scale-110 transition duration-500 ease-in-out" href="/navegacion/multimedia" onClick={handleDeselect}>MULTIMEDIA</Link>
        <Link className=" hover:text-gray-300 transform hover:scale-110 transition duration-500 ease-in-out" href="/navegacion/multimedia" onClick={handleSelect}>EDICION</Link>
        <Link className=" hover:text-gray-300 transform hover:scale-110 transition duration-500 ease-in-out" href="/navegacion/carga">CARGA</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
