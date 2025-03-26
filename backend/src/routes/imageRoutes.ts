import router from '../routes/router';
import { authenticateJWT, multerErrorHandler } from '../middlewares/authMidleware';
import { getAdminPhotos, uploadPhoto, updatePhoto, deletePhoto, getPhotoById, updateOrderGlobal, updateCategoryOrderPhoto } from "../controllers/imageController"; 
import upload from '../config/multer';

// Ruta para obtener todas las fotos del admin (protegida)
router.get("/photos", authenticateJWT, getAdminPhotos);

// Ruta para subir una nueva foto (protegida)
//router.post("/photos/upload", authenticateJWT, uploadPhoto);
router.post("/photos/upload", authenticateJWT, upload.single("image"), multerErrorHandler, uploadPhoto);

// Ruta para actualizar una foto existente (protegida)
router.put("/photos/update/:id", authenticateJWT, updatePhoto);

// Ruta para eliminar una foto (protegida)
router.delete("/photos/:id", authenticateJWT, deletePhoto);

//Ruta para buscar imagenes por id
router.get("/photos/id/:id", authenticateJWT, getPhotoById);

//Ruta para reordenar ubicaciones en categorias
router.put("/photos/updateorder", authenticateJWT, updateCategoryOrderPhoto);

//Ruta para reordenar ubicaciones globales
router.put("/photos/updateorderglobal", authenticateJWT, updateOrderGlobal)

export default router;