import router from '../routes/router';
import { authenticateJWT, multerErrorHandler } from '../middlewares/authMidleware';
import { getAdminPhotos, uploadPhoto, updatePhoto, deletePhoto, getPhotoById } from "../controllers/imageController"; 
import upload from '../config/multer';

// Ruta para obtener todas las fotos del admin (protegida)
router.get("/photos", authenticateJWT, getAdminPhotos);

// Ruta para subir una nueva foto (protegida)
//router.post("/photos/upload", authenticateJWT, uploadPhoto);
router.post("/photos/upload", authenticateJWT, upload.single("image"), multerErrorHandler, uploadPhoto);

// Ruta para actualizar una foto existente (protegida)
router.put("/photos/:id", authenticateJWT, updatePhoto);

// Ruta para eliminar una foto (protegida)
router.delete("/photos/:id", authenticateJWT, deletePhoto);

router.get("/photos/id/:id", authenticateJWT, getPhotoById);

export default router;