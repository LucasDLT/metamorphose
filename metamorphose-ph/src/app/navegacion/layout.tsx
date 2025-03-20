'use client';
import Link from "next/link";
const Layout = ({ children, }: Readonly <{ children: React.ReactNode }>) => {
  return (
    <div className="bg-white bg-opacity-5 rounded backdrop-blur-md max-w-screen-xl mx-auto my-32 flex flex-col items-center justify-center">
      <nav className="gap-4 flex justify-center p-4 text-sm">
        <Link href="/navegacion/multimedia">MULTIMEDIA</Link>
        <Link href="/navegacion/edicion">EDICION</Link>
        <Link href="/navegacion/carga">CARGA</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
