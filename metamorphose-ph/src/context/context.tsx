"use client";

import { useState, useEffect, createContext, ReactNode } from "react";

export interface Itoken {
  token?: string | null;
}
export interface Ifotos {
  id?: number;
  title?: string;
  history?: string;
  url?: string;
  createdAt?: string;
  active?:boolean;
  category?:ICategory;
}

export interface ICategory {
  id:number;
  name:string;
}

export interface IContextProps {
  token: Itoken | null;
  setToken: (token: Itoken | null) => void;
  fotos: Ifotos[] | [];
  setFotos: (fotos: Ifotos[]) => void;
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
}



export const ContextProvider = ({ children }: IContextProvider) => {
  const PORT = process.env.NEXT_PUBLIC_API_URL;

  const [token, setToken] = useState<Itoken | null>(() => {
    const storageToken = localStorage.getItem("token-admin");
    return storageToken ? { token: storageToken } : null;
  });

  const [fotos, setFotos] = useState<Ifotos[]>([]);

  const value = { token, setToken, fotos, setFotos };

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

      if (!response.ok) throw new Error("Error en la solicitud");

      const data: Ifotos[] = await response.json();
      console.log("resultado de fotos", data);

      data ? setFotos(data) : setFotos([]);
    } catch (error) {
      console.error("Error en el get: ", error);
    }
  }



  useEffect(() => {

    token && token.token
      ? localStorage.setItem("token-admin", token.token)        
      : localStorage.removeItem("token-admin");

    token && token.token 
      ? getPhotos(token) 
      : setFotos([]);

  }, [token]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
