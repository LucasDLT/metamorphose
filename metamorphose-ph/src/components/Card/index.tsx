import { Ifotos } from "@/context/context";
import Image from "next/image";
interface CardProps extends Ifotos {
  handleDelete?: () => void;
  handleUpdate?: () => void;
  url: string;
  title: string;
}

export const Card: React.FC<CardProps> = (fotos: CardProps) => {
  const {
    url,
    title,
    history,
    category,
    createdAt,
    active,
    handleDelete,
    handleUpdate,
  } = fotos;
  console.log(fotos);
  const newDate = new Date(createdAt!)
    .toLocaleDateString("es-ES")
    .replace(/\//g, "-");

  return (
    <div className="m-1 p-1 flex flex-col items-center rounded bg-zinc-800">
      <Image
        src={url}
        alt={title}
        width={100}
        height={100}
        className="flex justify-center items-center rounded w-full h-52 object-cover"
      />
      <div className="flex flex-row justify-between w-full text-xs ">
        <h2>{category?.name}</h2>
        <h2 >{newDate}</h2>
      </div>
      <div className="flex flex-col text-justify text-xs gap-1 mt-1 font-sans w-full">
        <h1>{title}</h1>
        <h3>{history}</h3>
        <h2>{active?.valueOf() ? "Activo" : "Inactivo"}</h2>
      </div>
      <div className="flex flex-row justify-between w-full mt-2 ">
        <button
          className="bg-zinc-900 p-2 rounded text-white border   border-zinc-600 text-center text-xs w-20"
          onClick={handleDelete}
        >
          eliminar
        </button>
        <button
          className="bg-zinc-900 p-2 rounded text-white border   border-zinc-600 text-cente text-xs"
          onClick={handleUpdate}
        >
          editar
        </button>
      </div>
    </div>
  );
};
