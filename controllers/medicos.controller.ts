import { Request, Response } from "express";
import { Result } from "express-validator";
import Medico from "../models/medico";


export const getMedicos = async ( req: Request , res: Response) => {
    
    try {
        const medicos = await Medico.find()
                                        .populate('createdByUser', 'nombre email status')
                                        .populate('hospital', 'nombre createdByUser');
        return res.status(200).json({
            ok: true,
            msg: 'GET | Medicos',
            medicos
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })   
    }
    
}

export const createMedico = async ( req: Request , res: Response) => {
    const { createdByUser , ...campos } = req.body;
    const uid = req.uid;
    try {
        const medico = new Medico( campos );
        medico.createdByUser = uid;
        medico.hospital = campos.id_hospital;
        await medico.save();

        res.status(200).json({
            ok: true,
            msg: 'Medico creado correctamente',
            medico
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }
}


export const updateMedico = async (req: Request, res: Response) => {
    const { createdByUser , ...campos } = req.body;
    const uid = req.uid; //por si se requiere el usuario que esta actualizando
    try {
        const medico = req.medicoAux; //obtenido por las validaciones del middleware
        
        medico.nombre = campos.nombre;
        await medico.save();

        res.status(200).json({
            ok: true,
            msg: 'Medico actualizado!',
            medico
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }
}
export const deleteMedico = async (req: Request, res: Response) => {
    const uid = req.uid; //por si se requiere el usuario que esta borrando
    try {
        const medico = req.medicoAux; //obtenido por las validaciones del middleware
        
        medico.status = false;
        await medico.save();

        res.status(200).json({
            ok: true,
            msg: 'DELETE | Medico borrado!',
            medico
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }
}

export const actualizarStatus = async ( req: Request , res: Response ) => {
    
    const medicos = await Medico.find();
    // await medicos.save();

    res.status(200).json({
        ok: true,
        msg: 'Actualizar status',
        medicos
    });
}