// Ruta de inicio 
// /api/usuarios
import { Router } from "express";
import { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarios.controller';
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { checarEmailExiste, checarEmailExisteLogin } from "../helpers/db-validators";
import { validaUsuarioExiste } from "../middlewares/validacionesUsuario";

const router = Router();
    router.get('/',[],getUsuarios);
    router.post('/',[
        check('nombre','Nombre es requerido').not().isEmpty(),
        check('email','Email es requerido').not().isEmpty(),
        check('password','Password es requerido').not().isEmpty(),
        check('email').custom(checarEmailExiste),
        validarCampos
    ],crearUsuario);
    router.put('/:id',[
        // check('id_user', 'Id no válido').isMongoId(),
        validaUsuarioExiste,
        validarCampos
    ],updateUsuario);
    router.delete('/:id',[
        // check('id_user', 'Id no válido').isMongoId(),
        // validaUsuarioExiste,
        // validarCampos
    ],deleteUsuario);

export default router;
