"use client";
import { useContext } from "react";
import { Context, Ifotos } from "@/context/context";
import { Card } from "@/components/Card";

export default function Multimedia() {
  const { token, fotos } = useContext(Context);
  console.log(token?.token);
  console.log("log de fotos en ", fotos[0]?.history);

  return (
    <div>
      {token ? <h1>Vista Multimedia</h1> : <h1>No te encontras registrado</h1>}

      <div>
        {token ? (
          <div>
            {fotos.map((foto: Ifotos) =>( 
              <Card
                title={foto.title}
                history={foto.history}
                category={foto.category}
                createdAt={foto.createdAt}
              />
           ))}
          </div>
        ) : (
          <h1>No te encontras registrado</h1>
        )}
      </div>
    </div>
  );
}
