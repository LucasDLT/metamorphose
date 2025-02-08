import router from "../routes/router";

import { emailController } from "../controllers/contactController";

//ruta para el envio de correos

router.post("/email", emailController);

export default router