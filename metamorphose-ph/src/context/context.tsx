"use client";

import { useState, useEffect, createContext, ReactNode } from "react";

export interface Itoken {
  token?: string | null;
}
export interface Ifotos {
  id: number;
  title: string;
  history: string;
  url: string;
  createdAt: string;
}
export interface IContextProps {
  token: Itoken | null;
  setToken: (token: Itoken | null) => void;
  fotos: Ifotos[];
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
  const [token, setToken] = useState<Itoken | null>(() => {
    const storageToken = localStorage.getItem("token-admin");
    return storageToken ? { token: storageToken } : null;
  });
  const [fotos, setFotos] = useState<Ifotos[]>([]);
  const value = { token, setToken, fotos, setFotos };

  useEffect(() => {
    token && token.token
      ? localStorage.setItem("token-admin", token.token)
      : localStorage.removeItem("token-admin");
  }, [token]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
