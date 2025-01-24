import { Image } from "../types/image.t";
// Simulación de base de datos en memoria para las fotos del admin
export let adminPhotos: Image[] = [
  { id: 1, title: "Foto Admin 1", history: "Descripción de la primera foto", url: "https://example.com/adminFoto1.jpg", createdAt: "2025-01-24" },
  { id: 2, title: "Foto Admin 2", history: "Descripción de la segunda foto", url: "https://example.com/adminFoto2.jpg", createdAt: "2025-01-24" },
];