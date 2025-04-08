"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context, ICategory, Ifotos } from "@/context/context";
import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";
import Image from "next/image";

export default function Multimedia() {
  const { token, fotos, setFotos, loading, error, category, selectedCategory } = useContext(Context);
  const [localFoto, setLocalFoto] = useState<Ifotos[]>([]);  // Fotos por categoría
  const [globalFotos, setGlobalFotos] = useState<Ifotos[]>([]); // Fotos globales
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFoto, setSelectedFoto] = useState<Ifotos | null>(null);
  const [idSelected, setIdSelected] = useState<number[]>([]);

  const idslength = idSelected?.length;
  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const handleCheckboxChange = (fotoId: number, checked: boolean) => {
    if (checked) {
      setIdSelected((prevIds) => [...prevIds, fotoId]);
    } else {
      setIdSelected((prevIds) => prevIds.filter((id) => id !== fotoId));
    }
  };

  const handlePutIds = async (ids: number[]) => {
    if (ids.length !== 2) {
      alert("no se recibieron ids en handlePutIds");
      return;
    }
    const idsObjet = {
      id1: ids[0],
      id2: ids[1],
    };

    try {
      let response;
      if (selectedCategory) {
        response = await fetch(`${PORT}/photos/updateorder`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idsObjet),
        });
      } else {
        response = await fetch(`${PORT}/photos/updateorderglobal`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(idsObjet),
        });
      }

      if (!response.ok) {
        throw new Error("Error al intercambiar fotos");
      }
      const data = await response.json();
      if (data.photos) {
        setFotos(data.photos);
        setIdSelected([]);
      }
    } catch (error) {
      console.error("Error al intercambiar fotos:", error);
    }
  };

  const toggleModal = (foto: Ifotos | null) => {
    setSelectedFoto(foto);
    setIsModalOpen(!isModalOpen);
  };

  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (loading) return <div>Cargando fotos...</div>;
    if (error) return <div>{error}</div>;

    try {
      const response = await fetch(`${PORT}/photos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.photos) {
        setFotos(data.photos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    router.push(`multimedia/${id}`);
  };

  const { url, title } = selectedFoto || {};
  const imageUrl = url
    ? url instanceof File
      ? URL.createObjectURL(url)
      : url
    : "";

  // Actualiza los estados de fotos por categoría y fotos globales
  useEffect(() => {
    if (token && token.token) {
      if (selectedCategory) {
        const filteredFotos = fotos.filter((foto) => foto.category?.id === selectedCategory.id );
        // Si hay una categoría seleccionada, usa las fotos de esa categoría
        setLocalFoto(
          filteredFotos.sort((a, b) => (a.categoryOrder || 0) - (b.categoryOrder || 0))
        );
      } else {
        // Si no hay categoría seleccionada, usa todas las fotos y ordena globalmente
        setGlobalFotos(
          fotos.sort((a, b) => (a.globalOrder || 0) - (b.globalOrder || 0))
        );
      }
    }
  }, [fotos, token, selectedCategory]);

  return (
    <div className="">
      {token ? (                                                
        <div
          className="grid grid-cols-3 font-afacad backdrop-blur-sm bg-black/50 rounded "
          style={{ scrollBehavior: "smooth",
            maxHeight: "calc(98vh - 200px)",
            overflowY: "auto",
           }}
        >
          {/* Muestra las fotos de la categoría seleccionada o las fotos globales */}
          {selectedCategory ? (
            localFoto.map((foto) => (
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
                handleModal={() => toggleModal(foto as Ifotos)}
                checked={idSelected.includes(foto.id as number)}
                handleChecked={(e) =>
                  handleCheckboxChange(foto.id as number, e.target.checked)
                }
              />
            ))
          ) : (
            globalFotos.map((foto) => (
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
                handleModal={() => toggleModal(foto as Ifotos)}
                checked={idSelected.includes(foto.id as number)}
                handleChecked={(e) =>
                  handleCheckboxChange(foto.id as number, e.target.checked)
                }
              />
            ))
          )}
          <Modal isOpen={isModalOpen} onClose={() => toggleModal(null)}>
            <Image
              className="w-full aspect-[1/1] object-cover mt-10 rounded"
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
        <button onClick={() => handlePutIds(idSelected)} className=" absolute top-[-10%]  right-2  transform hover:scale-110 transition duration-500 ease-in-out font-afacad fixed z-60 p-2  animate-pulse ">
          REORDENAR
        </button>
      )}
    </div>
  );
}
