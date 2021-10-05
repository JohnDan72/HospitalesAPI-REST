import { Router } from "express";
import { check } from "express-validator";
import { login, loginGoogle, renewToken } from "../controllers/login.controller";
import { validarCampos } from "../middlewares/validarCampos";
import { validarJWT } from '../middlewares/validarJWT';


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

router.get('/renewToken',[
    validarJWT
],renewToken);


export default router;