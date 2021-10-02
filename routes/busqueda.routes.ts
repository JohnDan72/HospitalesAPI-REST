import { Router } from "express";
import { buscarGeneral, buscarHospitales, buscarMedicos, buscarUsuarios } from "../controllers/busqueda.controller";
import { validarJWT } from "../middlewares/validarJWT";


const router = Router();

router.get('/',[
    validarJWT
],buscarGeneral);

router.get('/usuarios',[
    validarJWT
],buscarUsuarios);

router.get('/hospitales',[
    validarJWT
],buscarHospitales);

router.get('/medicos',[
    validarJWT
],buscarMedicos);

export default router;