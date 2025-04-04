"use client";

import { useState, useEffect, createContext, ReactNode } from "react";

export interface Itoken {
  token?: string | null;
}
export interface Ifotos {
  id?: number;
  title?: string;
  history?: string;
  url?: File | null;
  createdAt?: string;
  active?: boolean;
  category?: ICategory | null | undefined;
  globalOrder?: number;
  categoryOrder?: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IContextProps {
  token: Itoken | null;
  setToken: (token: Itoken | null) => void;
  fotos: Ifotos[] | [];
  setFotos: (fotos: Ifotos[]) => void;
  category: ICategory[] | [];
  setCategory: (category: ICategory[]) => void;
  selected: boolean | null;
  setSelected: (selected: boolean) => void;
}
export const Context = createContext<IContextProps>({} as IContextProps);

export interface IContextProvider {
  children: ReactNode;
}
export interface Ivalue {
  token: Itoken;
  setToken: (token: Itoken) => void;
  fotos: Ifotos[];
  setFotos: (fotos: Ifotos) => void;
  category: ICategory[];
  setCategory: (category: ICategory[]) => void;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export const ContextProvider = ({ children }: IContextProvider) => {
  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const [token, setToken] = useState<Itoken | null>(() => {
    const storageToken = localStorage.getItem("token-admin");
    return storageToken ? { token: storageToken } : null;
  });

  const [selected, setSelected] = useState<boolean>(false);

  const [fotos, setFotos] = useState<Ifotos[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);

  const value = { token, setToken, fotos, setFotos, category, setCategory, selected, setSelected };

  const getCategory = async (token: Itoken) => {
    if (!token) return;
    try {
      const response = await fetch(`${PORT}/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error("Error en la solicitud de categorias en Contexto");
      const data: ICategory[] = await response.json();
      console.log("categorias: ", data);
      data ? setCategory(data) : setCategory([]);
    } catch (error) {
      throw new Error("Error al obtener las categorias");
    }
  };

  async function getPhotos(token: Itoken) {
    if (!token) return;
    try {
      const response = await fetch(`${PORT}/photos`, {
        method: "GET",
        headers: {
          Authorization: ` Bearer ${token.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error("Error en la solicitud: Fotos del contexto");

      const data: Ifotos[] = await response.json();
      console.log("resultado de fotos", data);

      data ? setFotos(data) : setFotos([]);
    } catch (error) {
      throw new Error("Error al obtener las fotos");
    }
  }

  useEffect(() => {
    if (token && token.token) {
      localStorage.setItem("token-admin", token.token);
      getPhotos(token) 
      getCategory(token);
    } else {
      localStorage.removeItem("token-admin");
      setFotos([])
      setCategory([])
    }

  }, [token]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
