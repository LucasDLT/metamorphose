import { Ifotos } from "@/context/context";
import Image from "next/image";
interface CardProps extends Ifotos {
  handleDelete?: () => void;
  handleUpdate?: () => void;
  handleModal?: () => void;
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
    handleModal,
  } = fotos;
  console.log(fotos);
  const newDate = new Date(createdAt!)
    .toLocaleDateString("es-ES")
    .replace(/\//g, "-");

  return (
    <div className="m-1 flex flex-col items-center rounded bg-zinc-800 bg-opacity-50  font-sans ">
      <div className=" w-full text-xs flex flex-row justify-between ">
        <h2 className="hover:text-transparent uppercase flex alingn-center">
          {category?.name}
        </h2>
        <h2 className="uppercase">
          {active?.valueOf() ? "Activo" : "Inactivo"}
        </h2>
        <h2 className="hover:text-transparent uppercase flex alingn-center">
          {newDate}
        </h2>
      </div>
      <Image
        src={url}
        alt={title}
        width={100}
        height={100}
        className="flex justify-center items-center w-full h-52 object-cover "
      />
      <div className="flex flex-col text-justify text-xs w-full">
        <h1>{title}</h1>
        <h3>{history}</h3>
      </div>
      <div className="flex flex-row justify-between w-full text-xs ">
        <button
          className=" text-black hover:text-white"
          onClick={handleModal}
        >
          VER
        </button>
        <button
          className=" text-black hover:text-white"
          onClick={handleUpdate}
        >
          EDITAR
        </button>
        <button
          className="text-black hover:text-white"
          onClick={handleDelete}
        >
          ELIMINAR
        </button>
      </div>
    </div>
  );
};
