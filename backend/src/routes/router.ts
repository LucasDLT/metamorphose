import {Router} from "express";

const router: Router = Router();

router.get("/", (req, res) => {
    res.send("get funcionando OK");
});



export default router;