import { AppDataSource } from "../config/data-source";
import { Image } from "../models/image";

//para el orden en categorias
export const getNextOrderNumberInCategory = async (
  categoryId: number
): Promise<number> => {
  const imageRepository = AppDataSource.getRepository(Image);
  const lastImage = await imageRepository
    .createQueryBuilder("image")
    .where("image.categoryId = :categoryId", { categoryId })
    .orderBy("image.categoryOrder", "DESC")
    .getOne();
  if (!lastImage) return 1;
  return lastImage.categoryOrder + 1;
};

//para el orden global

export const getNextGlobalOrderNumber = async (): Promise<number> => {
  const imageRepository = AppDataSource.getRepository(Image);
  const lastImage = await imageRepository
    .createQueryBuilder("image")
    .orderBy("image.globalOrder", "DESC")
    .getOne();
  if (!lastImage) return +1;
  return lastImage.globalOrder + 1;
};
