import { Request, Response } from "express";
import Hospital from "../models/hospital";


export const getHospitales = async (req: Request, res: Response) => {
    try {
        const { limit = 3 , page = 0 } = req.query;
        const desde: number = Number(limit) * Number(page);
        const [ hospitales , total ] = await Promise.all([
            Hospital.find({status: true})
            .populate('createdByUser', 'nombre email status')
            .skip(desde)
            .limit(Number(limit)),
            Hospital.countDocuments({status: true})
        ]); 

        return res.status(200).json({
            ok: true,
            msg: 'GET | Hospitales',
            total,
            hospitales
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })   
    }
}
export const createHospital = async (req: Request, res: Response) => {
    const { createdByUser , ...campos } = req.body;
    const uid = req.uid;
    try {
        const hospital = new Hospital( campos );
        hospital.createdByUser = uid;
        await hospital.save();

        res.status(200).json({
            ok: true,
            msg: 'Hospital creado correctamente',
            hospital
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }

}
export const updateHospital = async (req: Request, res: Response) => {
    const { createdByUser , ...campos } = req.body;
    const uid = req.uid; //por si se requiere el usuario que esta actualizando
    try {
        const hospital = req.hospitalAux; //obtenido por las validaciones del middleware
        
        hospital.nombre = campos.nombre;
        await hospital.save();

        res.status(200).json({
            ok: true,
            msg: 'Hospital actualizado!',
            hospital
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }
}
export const deleteHospital = async (req: Request, res: Response) => {
    const uid = req.uid; //por si se requiere el usuario que esta borrando
    try {
        const hospital = req.hospitalAux; //obtenido por las validaciones del middleware
        
        hospital.status = false;
        await hospital.save();

        res.status(200).json({
            ok: true,
            msg: 'DELETE | Hospital borrado!',
            hospital
        })
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }
}