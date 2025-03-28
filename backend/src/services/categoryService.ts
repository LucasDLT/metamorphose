// services/categoryService.ts
import { AppDataSource } from "../config/data-source";
import { Category } from "../models/category";
import { Image } from "../models/image";

const categoryRepository = AppDataSource.getRepository(Category);
const imageRepository = AppDataSource.getRepository(Image);

export const createCategory = async (name: string): Promise<Category> => {
  
  let category = await categoryRepository.findOneBy({ name });
  if (!category) {
    category = categoryRepository.create({ name });
    await categoryRepository.save(category);
  }
  return category;
};

export const getAllCategories = async (): Promise<Category[]> => {

  const categories = await categoryRepository.find();

  for (const category of categories) {
    category.images = await imageRepository.find({ where: { category: category } });
  }

  return categories;
};

export const updateCategory = async (id: number, name: string): Promise<Category | null> => {
  const category = await categoryRepository.findOneBy({ id });
  if (!category) return null;
  category.name = name;
  return await categoryRepository.save(category);
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const deleted = await categoryRepository.delete(id);
  return deleted.affected !== 0;
};
