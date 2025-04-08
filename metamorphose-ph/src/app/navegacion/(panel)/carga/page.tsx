"use client";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { Context, ICategory, Ifotos } from "@/context/context";
import { toast } from "sonner";
import { IformErrors } from "@/types/error.t";
import { validateCargaImgen } from "@/helpers/validate";
import { SelectCategory } from "@/components/selectCategory";

export default function Carga() {
  const PORT = process.env.NEXT_PUBLIC_API_URL;
  const { setFotos, fotos, token, setCategory } = useContext(Context);
  const [error, setError] = useState<IformErrors>({});
  const [selectCategory, setSelectCategory] = useState<boolean>(true);

  const [formImg, setFormImg] = useState<Ifotos>({
    title: "",
    history: "",
    category: null,
    url: null,
    createdAt: "",
    active: true,
  });

  useEffect(() => {
    setError({});
  }, [selectCategory]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setFormImg({
      ...formImg,
      [event.target.name]: event.target.value,
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFormImg({
        ...formImg,
        url: file,
      });
    }
  };

  const handleActiveChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (selectCategory) {
      setFormImg({
        ...formImg,
        category: {
          id: 0,
          name: "",
        },
      });
      setSelectCategory(!selectCategory);
    }
  };
  const handleCategoryChange = (category: ICategory | null) => {
    setFormImg({
      ...formImg,
      category: category,
    });
  };

  const handleCategoryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFormImg({
      ...formImg,
      category: {
        id: 0,
        name: event.target.value,
      },
    });
  };

  const handleFile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCargaImgen(formImg as Ifotos);
    setError(validationErrors);

    if (Object.keys(validationErrors).length) return;

    if (!formImg?.url) {
      toast.warning("No se ha seleccionado ningun archivo", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          height: "40px",
          width: "300px",
          backgroundColor: "#6666662f",
          fontFamily: " afacad",
          padding: "10px",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", formImg.title ?? "");
    formData.append("history", formImg.history ?? "");
    formData.append("category", formImg.category?.name ?? "");
    formData.append("createdAt", formImg.createdAt ?? "");
    formData.append("active", formImg.active?.toString() ?? "");
    formData.append("image", formImg.url);

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

      if (formImg.category?.id === 0) {
        // Usamos el valor actual del estado `categories` dentro de la función de actualización
        setCategory((prevCategories: ICategory[]) => {
          // Añadimos la categoría si no existe
          if (!prevCategories.some((category: ICategory) => category.name === formImg.category?.name)) {
            return [...prevCategories, formImg.category as ICategory];
          }
          return prevCategories; // Si ya existe, no la agregamos de nuevo
        });
      }
      toast.success("Imagen cargada exitosamente", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          height: "25px",
          width: "200px",
          backgroundColor: "#6666662f",
          fontFamily: " afacad",
        },
      });
      setFormImg({
        title: "",
        history: "",
        category: { id: 0, name: "" },
        url: null,
        createdAt: "",
        active: true,
      });
      setError({});
    } catch (error) {
      toast.error("Error al cargar la imagen", { duration: 5000 });
      throw new Error("error en el post de imagenes" + error);
    }
  };
  return (
    <form
      onSubmit={handleFile}
      className="flex flex-row gap-4 rounded font-afacad border w-full p-4 justify-between items-center"
      method="POST"
    >
      {/*bloque para la imagen */}
      <div className="grid place-items-center">
        <h1 className="text-xl text-center">CARGA DE IMAGENES</h1>
        <input
          className="text-gray-300"
          type="file"
          name="url"
          id="url"
          onChange={handleFileChange}
        />
        {error.url && <p className="text-red-500">{error.url}</p>}
        <div
          className="rounded object-cover "
          style={{ width: "300px", height: "400px" }}
        >
          {formImg?.url && (
            <img
              src={URL.createObjectURL(formImg.url)}
              alt="preview"
              className="object-cover rounded"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>
      {/*bloque para los datos adicionales */}
      <div className=" border rounded flex flex-col p-4 gap-2 h-[300px] justify-evenly items-center">
        <label htmlFor="title">titulo</label>
        <input
          className="text-white bg-transparent border-b focus:outline-none"
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={formImg.title}
        />

        <label htmlFor="history">historia</label>
        <input
          type="text"
          name="history"
          id="history"
          onChange={handleChange}
          value={formImg.history}
          className="text-white bg-transparent border-b focus:outline-none "
        />
        {/* bloque selector para la categoria */}

        {selectCategory ? (
          <div>
            <label htmlFor="category">crear categoria</label>
            <button
              onClick={handleActiveChange}
              className="hover:text-gray-500 text-white"
            >
              seleccionar existente
            </button>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleCategoryInputChange}
              value={formImg.category?.name || ""}
              className="text-white bg-transparent border-b focus:outline-none"
            />
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectCategory(true)}
              className="hover:text-gray-500 text-white"
            >
              crear categoria
            </button>
            <SelectCategory
              onChange={handleCategoryChange}
              value={formImg.category?.name || ""}
              style={{
                color: "gray",
                backgroundColor: "transparent",
                outline: "none",
              }}
            />{" "}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 ">
          <div className="flex flex-col">
            <label htmlFor="createdAt">fecha</label>
            <input
              type="date"
              name="createdAt"
              id="createdAt"
              onChange={handleChange}
              className="text-white bg-transparent focus:outline-none"
              value={formImg.createdAt}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="active">active</label>
            <select
              name="active"
              id="active"
              onChange={(e) => {
                setFormImg({
                  ...formImg,
                  active: e.target.value === "true",
                });
              }}
              value={formImg?.active?.toString()}
              className="text-white bg-transparent focus:outline"
            >
              <option value="true" className="bg-zinc-900 hover:bg-gray-700">
                chi
              </option>
              <option value="false" className="bg-zinc-900 hover:bg-gray-700">
                ño
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col max-w-xs ">
          {error.title && <p className="text-red-500 text-xs">{error.title}</p>}

          {error.history && (
            <p className="text-red-500 text-xs">{error.history}</p>
          )}

          {error.createdAt && (
            <p className="text-red-500 text-xs">{error.createdAt}</p>
          )}

          {error.active && (
            <p className="text-red-500 text-xs">{error.active}</p>
          )}
        </div>
        <button className="text-sm border-b-2 border-gray-400 hover:border-none flex flex-col justify-center items-center rounded-lg  w-24 h-8 ">
          cargar
        </button>
      </div>

      <div
        className="
      border rounded flex flex-col p-4 gap-2 h-[300px] justify-evenly "
      >
        <p className="text-white rounded">TITULO: {formImg.title}</p>
        <p className="text-white rounded">
          CATEGORIA: {formImg.category?.name || "no seleccionada"}
        </p>
        <p className="text-white rounded">HISTORIA: {formImg.history}</p>
        <p className="text-white rounded">FECHA: {formImg.createdAt}</p>
      </div>
    </form>
  );
}
