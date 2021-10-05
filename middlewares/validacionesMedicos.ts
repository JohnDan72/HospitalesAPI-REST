import { NextFunction, Request, Response } from "express";
import Hospital from "../models/hospital";
import Medico from "../models/medico";
import mongoose from 'mongoose';



export const validaIdHospital = async ( req: Request , res: Response , next: NextFunction) => {
    try {
        const { id_hospital } = req.body;
        if(!mongoose.Types.ObjectId.isValid(id_hospital)){
            return res.status(400).json({
                ok: false,
                msg: `Id del hospital no valido`
            });
        }
        const existeHospital = await Hospital.findOne({ _id: id_hospital});
        if(!existeHospital){
            return res.status(400).json({
                ok: false,
                msg: `El hospital con id ${id_hospital} no existe`
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado ${error}`
        });
    }
}

//existe medico by id
export const validaMedicoExiste = async (req: Request , res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                ok: false,
                msg: `Id no valido`
            });
        }
        const existeMedico = await Medico.findOne({ _id: id, status: true });
        if (!existeMedico) {
            return res.status(400).json({
                ok: false,
                msg: `El medico con id ${id} no existe`
            });
        }
        req.medicoAux = existeMedico;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado: ${error}`
        });
    }
}