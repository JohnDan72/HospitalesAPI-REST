import { NextFunction, Request, Response } from "express";
import mongoose , { Mongoose } from "mongoose";
import Usuario from "../models/usuario";


//existe usuario by id
export const validaUsuarioExiste = async (req: Request , res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                ok: false,
                errors: [{msg: `Id no valido`}]
                
            });
        }
        const existeUsuario = await Usuario.findOne({_id: id, status: true});
        if (!existeUsuario) {
            return res.status(400).json({
                ok: false,
                errors: [{msg: `El usuario con id ${id} no existe`}]
                
            });
        }
        req.userAux = existeUsuario;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
            
        });
    }
}