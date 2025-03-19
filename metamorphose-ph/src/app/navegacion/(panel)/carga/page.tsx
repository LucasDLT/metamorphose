"use client";
import { useContext } from "react";
import { useState } from "react";
import { Context, Ifotos } from "@/context/context";

export default function Carga() {
  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const { setFotos, fotos, token } = useContext(Context);

  const [formImg, setFormImg] = useState({
    title: "",
    history: "",
    category: "",
    url: null as File | null,
    createdAt: "",
    active: true,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormImg({
      ...formImg,
      [event.target.name]: event.target.value,
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFormImg({
        ...formImg,
        url: file,
      });
      console.log("file seleccionado en el front", file);

      console.log("formImg", formImg);
      console.log("formImg", formImg.url);
    }
  };
  const handleFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formImg.url) {
      console.log("No se ha seleccionado ningun archivo");
      return;
    }

    const formData = new FormData();
    formData.append("title", formImg.title);
    formData.append("history", formImg.history);
    formData.append("category", formImg.category);
    formData.append("createdAt", formImg.createdAt);
    formData.append("active", formImg.active.toString());

    formData.append("image", formImg.url);

    console.log("Contenido de FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${PORT}/photos/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token?.token}`,
        },
        body: formData,
    });
      const data: { photo: Ifotos } = await response.json();
      if (data.photo) {
          setFotos([...fotos, data.photo as Ifotos]);
      }
      console.log("response de la carga :", data.photo);
    } catch (error) {
      throw new Error("error en el post de imagenes" + error);
    }
  };
  return (
    <div>
      <h1>Carga de Imagenes</h1>

      <div>
          <label htmlFor="url">Vista previa de la imagen</label>
        {formImg.url && (
          <img src={URL.createObjectURL(formImg.url)} alt="preview" className="w-44" />
        )}
      </div>
      <form
        onSubmit={handleFile}
        className="text-black flex flex-col"
        method="POST"
      >
        <input type="file" name="url" id="url" onChange={handleFileChange} />

        <label htmlFor="title">titulo</label>
        <input type="text" name="title" id="title" onChange={handleChange} />

        <label htmlFor="history">history</label>
        <input
          type="text"
          name="history"
          id="history"
          onChange={handleChange}
        />

        <label htmlFor="category">category</label>
        <input
          type="text"
          name="category"
          id="category"
          onChange={handleChange}
        />

        <label htmlFor="createdAt">createdAt</label>
        <input
          type="date"
          name="createdAt"
          id="createdAt"
          onChange={handleChange}
        />

        <label htmlFor="active">active</label>
        <input type="text" name="active" id="active" onChange={handleChange} />

        <button>cargar</button>
      </form>

    </div>
  );
}
