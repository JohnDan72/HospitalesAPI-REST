import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/login.controller";
import { validarCampos } from "../middlewares/validarCampos";


const router = Router();

router.post('/',[
    check('email','Campo requerido').trim().not().isEmpty(),
    check('password','Campo requerido').trim().not().isEmpty(),

    validarCampos
],login);


export default router;