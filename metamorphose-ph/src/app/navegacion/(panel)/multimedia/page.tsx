"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context, Ifotos } from "@/context/context";
import { Card } from "@/components/Card";

export default function Multimedia() {
  const { token, fotos, setFotos } = useContext(Context);
  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const [localFoto, setLocalFoto] = useState<Ifotos[]>([]);
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
    <div>
      {token ? (
        <div>
          <h1>Vista Multimedia</h1>

          {Array.isArray(localFoto) && localFoto.length > 0 ? (
            <div>
              {localFoto.map((foto) => (
                <Card
                  key={foto.id}
                  url={foto.url}
                  title={foto.title}
                  history={foto.history}
                  category={foto.category}
                  createdAt={foto.createdAt}
                  active={foto.active}
                  handleDelete={()=>handleDelete(foto.id as number)}
                  handleUpdate={()=>handleUpdate(foto.id as number)}
                  
                />
              ))}
            </div>
          ) : (
            <h1>No hay fotos en la base de datos</h1>
          )}
        </div>
      ) : (
        <h1>No te encontras registrado</h1>
      )}
    </div>
  );
}
