"use client";
import { useContext } from "react";
import { useState } from "react";
import { Context, Ifotos } from "@/context/context";
import { toast } from "sonner";

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
      toast.warning("No se ha seleccionado ningun archivo", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          height: "40px",
          width: "300px",
          backgroundColor: "#6666662f",
          fontFamily:" afacad",
          padding: "10px",
        },
      })
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
      toast.success("Imagen cargada exitosamente", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          height: "25px",
          width: "200px",
          backgroundColor: "#6666662f",
          fontFamily:" afacad",
        },
      });
      console.log("response de la carga :", data.photo);
      setFormImg({
        title: "",
        history: "",
        category: "",
        url: null,
        createdAt: "",
        active: true,
      })
    } catch (error) {
      toast.error("Error al cargar la imagen", { duration: 5000 });
      throw new Error("error en el post de imagenes" + error);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-20 mt-10">
      <div
        className="text-center bg-gradient-to-t from-zinc-900 via-black-900 to-black-900 rounded object-cover "
        style={{ width: "300px", height: "400px" }}
      >
        {formImg.url && (
          <img
            src={URL.createObjectURL(formImg.url)}
            alt="preview"
            className="object-cover rounded"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      <form
        onSubmit={handleFile}
        className=" flex flex-col bg-gradient-to-t from-zinc-900 via-black-900 to-black-900 rounded p-2"
        method="POST"
      >
        <h1 className="text-xl text-center m-5">CARGA DE IMAGENES</h1>
        <input
          className="text-gray-300 "
          type="file"
          name="url"
          id="url"
          onChange={handleFileChange}
        />

        <label htmlFor="title">titulo</label>
        <input
          className="text-black rounded"
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
        />

        <label htmlFor="history">history</label>
        <input
          type="text"
          name="history"
          id="history"
          onChange={handleChange}
          className="text-black rounded"
        />

        <label htmlFor="category">category</label>
        <input
          type="text"
          name="category"
          id="category"
          onChange={handleChange}
          className="text-black"
        />

        <label htmlFor="createdAt">fecha</label>
        <input
          type="date"
          name="createdAt"
          id="createdAt"
          onChange={handleChange}
          className="text-black rounded"
        />

        <label htmlFor="active">active</label>
        <input
          className="text-black rounded"
          type="text"
          name="active"
          id="active"
          onChange={handleChange}
        />

        <button className="text-sm border-b-2 border-gray-400 hover:border-none m-auto flex flex-col justify-center items-center p-1 m-1 rounded-lg  w-24 h-6 ">cargar</button>
      </form>
      <div
        className="text-left bg-gradient-to-t from-zinc-900 via-black-900 to-black-900 rounded object-cover  "
        style={{ width: "300px", height: "400px" }}
      >
        <p className="text-white rounded">TITULO: {formImg.title}</p>
        <p className="text-white rounded">CATEGORIA: {formImg.category}</p>
        <p className="text-white rounded">HISTORIA: {formImg.history}</p>
        <p className="text-white rounded">FECHA: {formImg.createdAt}</p>
      </div>
    </div>
  );
}
