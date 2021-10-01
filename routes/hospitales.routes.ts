import { Router } from 'express';
import { check } from 'express-validator';
import { createHospital, deleteHospital, getHospitales, updateHospital } from '../controllers/hospitales.controller';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';


const router = Router();

router.get('/',[
    validarJWT
],getHospitales);
router.post('/',[
    validarJWT,
    check('nombre', 'Nombre del hospital es requerido').trim().not().isEmpty(),
    validarCampos
],createHospital);
router.put('/:id',[],updateHospital);
router.delete('/:id',[],deleteHospital);


export default router;