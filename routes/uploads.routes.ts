import { Router } from "express";
import fileUpload from "express-fileupload";
import { check } from "express-validator";
import { uploadFile } from "../controllers/uploads.controller";
import { validarJWT } from "../middlewares/validarJWT";
import { validarCampos } from '../middlewares/validarCampos';


const router = Router();

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));


router.put('/', [
    validarJWT,
    check('uid','uid requerido').not().isEmpty(),
    check('uid','No es un id válido').isMongoId(),
    validarCampos
], uploadFile);

export default router;