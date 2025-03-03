import  router  from "../routes/router";
import {
  getCategories,
  postCategory,
  putCategory,
  deleteCategoryById,
} from "../controllers/categoryController";

router.get("/categories", getCategories);
router.post("/categories", postCategory);
router.put("/categories/:id", putCategory);
router.delete("/categories/:id", deleteCategoryById);

export default router;
