"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context, Ifotos } from "@/context/context";
import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";
import Image from "next/image";

export default function Multimedia() {
  const { token, fotos, setFotos, loading, error } = useContext(Context);
  const [localFoto, setLocalFoto] = useState<Ifotos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFoto, setSelectedFoto] = useState<Ifotos | null>(null);
  const [idSelected, setIdSelected] = useState<number[]>([]);
  {
    /*este estado es para guardar los id de las fotos seleccionadas TIENEN QUE SER DOS voy a ocultar el boton para el cambio hasta que sean DOS si se pasa se saca del DOM*/
  }
  const idslength = idSelected?.length;

  {
    /*este es para saber la longitud de los ids y controlar si son 2 o mas o menos*/
  }

  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const handleCheckboxChange = (fotoId: number, checked: boolean) => {
    // Si el checkbox está marcado
    if (checked) {
      // Actualizamos el estado agregando la id de la foto al array
      setIdSelected((prevIds) => [...prevIds, fotoId]);
    } else {
      // Si el checkbox está desmarcado, eliminamos la id de la foto del array
      setIdSelected((prevIds) => prevIds.filter((id) => id !== fotoId));

    }
  };

  const handlePutIds = async (ids: number[]) => {
    if (ids.length !== 2) {
      // verifico que llegue algo
      alert("no se recibieron ids en handlePutIds");
      return;
    }
    const idsObjet = {
      id1: ids[0],
      id2: ids[1],
      //aca creo un objeto acorde lo que recibe el backend
    };

    console.log(idsObjet);

    try {
      const response = await fetch(`${PORT}/photos/updateorderglobal`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "application/json",
        },
        body: idsObjet ? JSON.stringify(idsObjet) : null,
      });
      if (!response.ok) {
        throw new Error("Error al intercambiar fotos");
      }
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      if (data.photos) {
        setFotos(data.photos);
        setIdSelected([]);
        console.log("idSelected", idSelected);
        
      }
    } catch (error) {
      console.error("Error al intercambiar fotos:", error);
      throw new Error("Error al obtener las fotos");
    }
  };

  const toggleModal = (foto: Ifotos | null) => {
    setSelectedFoto(foto);
    setIsModalOpen(!isModalOpen);
  };

  const router = useRouter();



  const handleDelete = async (id: number) => {
    console.log("click en delete ", id);

    // Si estamos cargando las fotos o hay un error
    if (loading) {
      return <div>Cargando fotos...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    try {
      const response = await fetch(`${PORT}/photos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.photos) {
        setFotos(data.photos);
      }
      console.log(data.photos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    router.push(`multimedia/${id}`);
  };

  const { url, title } = fotos[0] || {};

  const imageUrl = url
    ? url instanceof File
      ? URL.createObjectURL(url)
      : url
    : "";

    useEffect(() => {
      if (token && token.token) setLocalFoto(fotos);
    }, [fotos, token]);

  return (
    <div className="">
      {token ? (
        <div
          className="grid grid-cols-6 overflow-y-scroll gap-1 z-0 h-screen"
          style={{ scrollBehavior: "smooth" }}
        >
          {Array.isArray(localFoto) && localFoto.length > 0 ? (
            localFoto
              .sort((a, b) => (b.globalOrder || 0) - (a.globalOrder || 0))
              .map((foto) => (
                <Card
                  key={foto.id}
                  url={foto.url!}
                  title={foto.title!}
                  history={foto.history}
                  category={foto.category}
                  createdAt={foto.createdAt}
                  active={foto.active}
                  handleDelete={() => handleDelete(foto.id as number)}
                  handleUpdate={() => handleUpdate(foto.id as number)}
                  handleModal={() => toggleModal(foto)}
                  checked={idSelected.includes(foto.id as number)}
                  handleChecked={(e) =>
                    handleCheckboxChange(foto.id as number, e.target.checked)

                  }
                />
              ))
          ) : (
            <h1>No hay fotos en la base de datos</h1>
          )}
          <Modal isOpen={isModalOpen} onClose={() => toggleModal(null)}>
            <Image
              className="w-96 aspect-[9/9] object-cover mt-16"
              src={imageUrl}
              alt={title || "Imagen"}
              width={500}
              height={500}
            />
          </Modal>
        </div>
      ) : (
        <h1>No te encontras registrado</h1>
      )}
      {idslength === 2 && (
        <button onClick={() => handlePutIds(idSelected)}>
          realizar cambio
        </button>
      )}
    </div>
  );
}
