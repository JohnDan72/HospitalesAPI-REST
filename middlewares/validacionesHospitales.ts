import { NextFunction, Request, Response } from "express";
import mongoose , { Mongoose } from "mongoose";
import Hospital from "../models/hospital";


//existe usuario by id
export const validaHospitalExiste = async (req: Request , res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                ok: false,
                errors: [{msg: `Id no valido`}]
                
            });
        }
        const existeHospital = await Hospital.findOne({ _id: id, status: true });
        if (!existeHospital) {
            return res.status(400).json({
                ok: false,
                errors: [{msg: `El hospital con id ${id} no existe`}]
                
            });
        }
        req.hospitalAux = existeHospital;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
            
        });
    }
}