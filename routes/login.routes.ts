import { Router } from "express";
import { check } from "express-validator";
import { login, loginGoogle } from "../controllers/login.controller";
import { validarCampos } from "../middlewares/validarCampos";


const router = Router();

router.post('/',[
    check('email','Campo requerido').trim().not().isEmpty(),
    check('password','Campo requerido').trim().not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('token','Campo requerido').not().isEmpty(),
    validarCampos
],loginGoogle);


export default router;