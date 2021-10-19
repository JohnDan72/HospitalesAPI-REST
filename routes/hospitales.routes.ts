import { Router } from 'express';
import { check } from 'express-validator';
import { createHospital, deleteHospital, getAllHospitales, getHospitales, updateHospital } from '../controllers/hospitales.controller';
import { validaHospitalExiste } from '../middlewares/validacionesHospitales';
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from '../middlewares/validarJWT';


const router = Router();

router.get('/',[
    validarJWT
],getHospitales);

router.get('/all',[
    validarJWT
],getAllHospitales);

router.post('/',[
    validarJWT,
    check('nombre', 'Nombre del hospital es requerido').trim().not().isEmpty(),
    validarCampos
],createHospital);

router.put('/:id',[
    validarJWT,
    validaHospitalExiste,
    check('nombre', 'Nombre del hospital es requerido').trim().not().isEmpty(),
    validarCampos
],updateHospital);

router.delete('/:id',[
    validarJWT,
    validaHospitalExiste,
],deleteHospital);


export default router;