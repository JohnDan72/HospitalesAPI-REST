import { Request, Response } from "express";
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
export const updateMedico = async ( req: Request , res: Response) => {
    return res.status(200).json({
        ok: true,
        msg: 'PUT | Medicos'
    })
}
export const deleteMedico = async ( req: Request , res: Response) => {
    return res.status(200).json({
        ok: true,
        msg: 'DELETE | Medicos'
    })
}