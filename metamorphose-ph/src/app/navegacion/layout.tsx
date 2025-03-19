'use client';
import Link from "next/link";
const Layout = ({ children, }: Readonly <{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-900 w-full max-w-3xl mx-auto my-10 p-6 rounded-lg shadow-lg">
      <nav className="gap-4 flex justify-center p-4">
        <Link href="/navegacion/multimedia">MULTIMEDIA</Link>
        <Link href="/navegacion/edicion">EDICION</Link>
        <Link href="/navegacion/carga">CARGA</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
