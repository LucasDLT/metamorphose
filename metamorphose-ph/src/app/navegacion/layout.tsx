import Link from "next/link";
const Layout = ({ children, }: Readonly <{ children: React.ReactNode }>) => {
  return (
    <div className="bg-gray-900">
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
