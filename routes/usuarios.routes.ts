// Ruta de inicio 
// /api/usuarios
import { Router } from "express";
import { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller';
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { checarEmailExiste, checarEmailExisteLogin } from "../helpers/db-validators";
import { tieneRole, validaUsuarioExiste } from "../middlewares/validacionesUsuario";
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();
    router.get('/',[
        validarJWT
    ],getUsuarios);
    router.post('/',[
        check('nombre','Nombre es requerido').trim().not().isEmpty(),
        check('email','Email es requerido').trim().not().isEmpty(),
        check('password','Password es requerido').trim().not().isEmpty(),
        check('email').custom(checarEmailExiste),
        validarCampos
    ],crearUsuario);
    router.put('/:id',[
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        // check('id_user', 'Id no válido').isMongoId(),
        validaUsuarioExiste,
        validarCampos
    ],updateUsuario);
    router.delete('/:id',[
        validarJWT,
        validaUsuarioExiste
    ],deleteUsuario);

export default router;
