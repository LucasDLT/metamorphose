// controllers/categoryController.ts
import { Request, Response } from "express";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../services/categoryService";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías." });
  }
};

export const postCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "El nombre de la categoría es obligatorio." });
      return;
    }
    const category = await createCategory(name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoría." });
  }
};

export const putCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await updateCategory(parseInt(id), name);
    if (!category) {
      res.status(404).json({ message: "Categoría no encontrada." });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar categoría." });
  }
};

export const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const isDeleted = await deleteCategory(parseInt(id));
    if (!isDeleted) {
      res.status(404).json({ message: "Categoría no encontrada." });
      return;
    }
    res.json({ message: "Categoría eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría." });
  }
};

