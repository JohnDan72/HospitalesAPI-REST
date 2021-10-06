import { Router } from "express";
import { check } from "express-validator";
import { actualizarStatus, createMedico, deleteMedico, getMedicos, updateMedico } from "../controllers/medicos.controller";
import { validarJWT } from '../middlewares/validarJWT';
import { validarCampos } from '../middlewares/validarCampos';
import { validaIdHospital, validaMedicoExiste, validaMedicoYHospitalExiste } from "../middlewares/validacionesMedicos";


const router = Router();
router.get('/',[],getMedicos);

router.post('/',[
    validarJWT,
    validaIdHospital,
    check('nombre', 'El nombre es requerido').trim().not().isEmpty(),
    validarCampos
],createMedico);

router.put('/:id',[
    validarJWT,
    validaMedicoYHospitalExiste,
    check('nombre', 'Nombre del médico es requerido').trim().not().isEmpty(),
    validarCampos
],updateMedico);

router.delete('/:id',[
    validarJWT,
    validaMedicoExiste,
],deleteMedico);

// this route is used to turn true all document's status
// router.get('/actualizarStatus', actualizarStatus);

export default router;