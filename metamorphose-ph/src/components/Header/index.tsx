import Image from "next/image"
import Titulo from "../../../public/Titulo.png"
import Logo from "../../../public/Logo.png"

export default function Header() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Image 
        src={Titulo} 
        alt={"Titulo Metamorphose"}
        width={500} 
        className=""/>
        <Image 
        src={Logo} 
        alt={"Logo Metamorphose"}
        width={60}/>
      </div>
    )
}