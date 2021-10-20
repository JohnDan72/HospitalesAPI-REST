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
                errors: [{msg: `Id del hospital no valido`}]
                
            });
        }
        const existeHospital = await Hospital.findOne({ _id: id_hospital, status: true});
        if(!existeHospital){
            return res.status(400).json({
                ok: false,
                errors: [{msg: `El hospital con id ${id_hospital} no existe`}]
                
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado ${error}`}]
            
        });
    }
}

//existe medico by id
export const validaMedicoExiste = async (req: Request , res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){ //validación del id médico
            return res.status(400).json({
                ok: false,
                errors: [{msg: `Id no valido`}]
                
            });
        }
        
        const existeMedico = await Medico.findOne({ _id: id, status: true })
                                        .populate('createdByUser', 'nombre email role img google')
                                        // .populate('hospital', 'nombre img createdByUser')
                                        .populate({
                                            path: 'hospital',
                                            populate: {
                                                path: 'createdByUser',
                                                select: 'nombre email role img google'
                                            },
                                            select: 'nombre img'
                                        });

        if (!existeMedico) {
            return res.status(400).json({
                ok: false,
                errors: [{msg: `El medico con id ${id} no existe`}]
                
            });
        }
        
        req.medicoAux = existeMedico;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
            
        });
    }
}

// valida médico y hospital
export const validaMedicoYHospitalExiste = async (req: Request , res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { id_hospital } = req.body;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){ //validación del id médico
            return res.status(400).json({
                ok: false,
                msg: `Id del médico no valido`
            });
        }
        if(!mongoose.Types.ObjectId.isValid(id_hospital)){ //validación del id del hospital
            return res.status(400).json({
                ok: false,
                msg: `Id del hospital no valido`
            });
        }
        const [ existeMedico , existeHospital ] = await Promise.all([
            Medico.findOne({ _id: id, status: true }),
            Hospital.findOne({ _id: id_hospital, status: true})
        ]);

        if (!existeMedico) {
            return res.status(400).json({
                ok: false,
                msg: `El medico con id ${id} no existe`
            });
        }
        if(!existeHospital){
            return res.status(400).json({
                ok: false,
                msg: `El hospital con id ${id_hospital} no existe`
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
