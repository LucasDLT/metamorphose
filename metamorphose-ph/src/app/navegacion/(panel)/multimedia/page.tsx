"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context, Ifotos } from "@/context/context";
import { Card } from "@/components/Card";
import { Modal } from "@/components/Modal";

export default function Multimedia() {
  const { token, fotos, setFotos } = useContext(Context);
  const [localFoto, setLocalFoto] = useState<Ifotos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFoto, setSelectedFoto]=useState<Ifotos|null>(null)

  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const toggleModal = (foto:Ifotos | null) =>{
    setSelectedFoto(foto)
    setIsModalOpen(!isModalOpen);
  } 

  const router = useRouter();

  useEffect(() => {
    setLocalFoto(fotos);
  }, [fotos]);

  const handleDelete = async (id: number) => {
    console.log("click en delete ", id);

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: number) => {
    router.push(`multimedia/${id}`);
  };

  return (
    <div className="">
      {token ? (
        <div className="grid grid-cols-6 overflow-y-scroll gap-1 mt-10 absolute top-40 left-32 bottom-0 right-28 z-0 h-screen " style={{scrollBehavior:"smooth"}}>
          {Array.isArray(localFoto) && localFoto.length > 0 ? (
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
                handleModal={() => toggleModal(foto)}
              />
            ))
          ) : (
            <h1>No hay fotos en la base de datos</h1>
          )}
          <Modal isOpen={isModalOpen} onClose={()=>toggleModal(null)}>
            <img className="w-96 aspect-[9/9] object-cover mt-16" src={selectedFoto?.url} alt={selectedFoto?.title} />
          </Modal>
        </div>
      ) : (
        <h1>No te encontras registrado</h1>
      )}
    </div>
  );
}
