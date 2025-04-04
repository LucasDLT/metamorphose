import { Context, Ifotos } from "@/context/context";
import { useContext } from "react";
import Image from "next/image";
interface CardProps extends Ifotos {
  handleDelete?: () => void;
  handleUpdate?: () => void;
  handleModal?: () => void;
  handleChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void; //dejo esto aca para un selector de botones que se activa con el panel EDICION tengo que hacer dos bloques de divs para que se seleccione entre uno y otro, un boton que la active y le pase a esta funcion un valor booleano para que se muestre el otro. Se ve entre la vista multimedia y la de edicion de ubicacion.

}

export const Card: React.FC<CardProps> = (fotos: CardProps) => {
  const {
    url,
    title,
    history,
    category,
    createdAt,
    active,
    globalOrder,
    categoryOrder,
    handleDelete,
    handleUpdate,
    handleModal,
    handleChecked
  } = fotos;

  const newDate = new Date(createdAt!)
    .toLocaleDateString("es-ES")
    .replace(/\//g, "-");

  const imageUrl = url
    ? url instanceof File
      ? URL.createObjectURL(url)
      : url
    : "";
  const { selected } = useContext(Context);

  return (
    <div className="m-1 flex flex-col items-center rounded font-sans relative z-0 ">
      {!selected && (
        <div className="w-full text-xs flex flex-row justify-between absolute top-0 left-0 right-0 bg-black bg-opacity-80 z-10 font-afacad ">
          <h2 className="text-gray-300 hover:text-gray-500 uppercase flex alingn-center transition duration-500 ease-in-out">
            {category?.name}
          </h2>
          <h2 className="text-gray-300 hover:text-gray-500 uppercase transition duration-500 ease-in-out">
            {active?.valueOf() ? "Activo" : "Inactivo"}
          </h2>
          <h2 className="text-gray-300 hover:text-gray-500 uppercase flex alingn-center transition duration-500 ease-in-out">
            {newDate}
          </h2>
        </div>
      )}
      <Image
        src={imageUrl}
        alt={title || "Imagen"}
        width={100}
        height={100}
        className="flex justify-center items-center w-full h-52 object-cover rounded hover:opacity-50 transition duration-500 ease-in-out"
      />
      {!selected && (
        <div className="flex flex-row justify-between w-full text-xs absolute bottom-8 left-0 right-0 bg-black bg-opacity-80 z-10 font-afacad ">
          <button
            className="text-gray-300 hover:text-gray-500 transition duration-500 ease-in-out"
            onClick={handleModal}
          >
            VER
          </button>
          <button
            className="text-gray-300 hover:text-gray-500 transition duration-500 ease-in-out"
            onClick={handleUpdate}
          >
            EDICION
          </button>
          <button
            className="text-gray-300 hover:text-gray-500 transition duration-500 ease-in-out "
            onClick={handleDelete}
          >
            ELIMINAR
          </button>
        </div>
      )}
      {!selected && (
        <div className="flex flex-col text-justify text-xs w-full font-afacad">
          <h1>{title}</h1>
          <h3>{history}</h3>
        </div>
      )}
      {selected && 
      <input
       type="checkbox" 
       name="swap" 
       id="swap"
       onChange={handleChecked} 
       />}
    </div>
  );
};
