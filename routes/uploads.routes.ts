import { Router } from "express";
import fileUpload from "express-fileupload";
import { uploadFile } from "../controllers/uploads.controller";
import { validarJWT } from "../middlewares/validarJWT";


const router = Router();

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));


router.put('/', [
    validarJWT
], uploadFile);

export default router;