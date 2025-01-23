import router from '../routes/router';
import {login, register} from "../controllers/authController"

//ruta de login 

router.post("/login",login)

//ruta para el registro 

router.post("/register",register)


export default router