import { Router } from "express";
import { check } from "express-validator";
import { createMedico, deleteMedico, getMedicos, updateMedico } from "../controllers/medicos.controller";
import { validarJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validarCampos';
import { validaIdHospital } from "../middlewares/validacionesMedicos";


const router = Router();
router.get('/',[],getMedicos);
router.post('/',[
    validarJWT,
    validaIdHospital,
    check('nombre', 'El nombre es requerido').trim().not().isEmpty(),
    validarCampos
],createMedico);
router.put('/:id',[],updateMedico);
router.delete('/:id',[],deleteMedico);

export default router;