'use client';
import Link from "next/link";
const Layout = ({ children, }: Readonly <{ children: React.ReactNode }>) => {
  return (
<div className=" mt-1 rounded max-w-screen-xl bg-transparent">
      <nav className=" flex flex-row justify-evenly text-xs fixed top-40 left-32 ml-1 p-3 right-32 -mr-1.5 z-50 backdrop-blur-lg ">
        <Link href="/navegacion/multimedia">MULTIMEDIA</Link>
        <Link href="/navegacion/edicion">EDICION</Link>
        <Link href="/navegacion/carga">CARGA</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
