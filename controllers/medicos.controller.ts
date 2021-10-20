import { Request, Response } from "express";
import { Result } from "express-validator";
import Medico from "../models/medico";
import Usuario from "../models/usuario";


export const getMedicos = async (req: Request, res: Response) => {

    try {
        const { limit = 3, page = 0 } = req.query;
        const desde: number = Number(limit) * Number(page);
        const [medicos, total] = await Promise.all([
            Medico.find({ status: true })
                .populate('createdByUser', 'nombre email status')
                .populate('hospital', 'nombre createdByUser')
                .skip(desde)
                .limit(Number(limit)),
            Medico.countDocuments({ status: true })
        ]);

        return res.status(200).json({
            ok: true,
            msg: 'GET | Médicos',
            total,
            medicos
        });

    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: `Error inesperado ${error}`
        })
    }

}

export const createMedico = async (req: Request, res: Response) => {
    const { createdByUser, ...campos } = req.body;
    const uid = req.uid;
    try {
        const medico = new Medico(campos);
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
    const { createdByUser, img , hospital, status , ...campos } = req.body;
    const uid = req.uid; //por si se requiere el usuario que esta actualizando
    try {
        const medico = req.medicoAux; //obtenido por las validaciones del middleware

        medico.nombre = campos.nombre;
        medico.hospital = campos.id_hospital;
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


// extra: get médico by id
export const getMedicoById = (req: Request , res: Response) => {
    try {
        const medico = req.medicoAux;
        res.status(200).json({
            ok: true,
            msg: 'GET | Médico By Id',
            medico
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
        });
    }
}
// aux function to set status: true to all documents of my schema
export const actualizarStatus = async (req: Request, res: Response) => {

    const medicos = await Usuario.updateMany({},{status: true});
// const medicos = await Medico.updateMany({},{status: true});
    // await medicos.save();

    res.status(200).json({
        ok: true,
        msg: 'Actualizar status',
        medicos
    });
}