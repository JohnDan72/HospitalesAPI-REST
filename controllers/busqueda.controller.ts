import { Request, Response } from "express";
import mongoose from "mongoose";
import Hospital from "../models/hospital";
import Usuario from "../models/usuario";
import Medico from "../models/medico";

export const buscarGeneral = async (req: Request, res: Response) => {
    try {
        const { limit = 3, page = 0, collection, busqueda } = req.query;
        const desde: number = Number(limit) * Number(page);
        const regex = new RegExp(<string>busqueda, 'i');
        let data: any[] = [];

        switch (<string>collection) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex })
                    .skip(desde)
                    .limit(Number(limit));
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('createdByUser', 'nombre email')
                    .skip(desde)
                    .limit(Number(limit));
                break;
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('createdByUser', 'nombre email')
                    .populate('hospital', 'nombre')
                    .skip(desde)
                    .limit(Number(limit));
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Bad request'
                });
            
        }

        res.status(200).json({
            ok: true,
            msg: `GET búsqueda general`,
            params: req.query,
            results: data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperdado ${error}`
        });
    }
}

// solo de usuarios
export const buscarUsuarios = async (req: Request, res: Response) => {
    try {
        const { limit = 3, page = 0, busqueda } = req.query;

        // si es mongo_id se retorna el resultado
        if (mongoose.Types.ObjectId.isValid(<string>busqueda)) {
            const usuario = await Usuario.findOne({ _id: busqueda });
            return res.status(200).json({
                ok: true,
                msg: 'GET only user by id',
                results: (usuario) ? [usuario] : []
            });
        }

        // de otro modo se realiza la búsqueda por los demás campos

        const desde: number = Number(limit) * Number(page);
        const regex = new RegExp(<string>busqueda, 'i');
        const usuarios = await Usuario.find({ nombre: regex })
            .skip(desde)
            .limit(Number(limit));

        res.status(200).json({
            ok: true,
            msg: `GET búsqueda general`,
            params: req.query,
            results: usuarios
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperdado ${error}`
        });
    }
}

// solo hospitales
export const buscarHospitales = async (req: Request, res: Response) => {
    try {
        const { limit = 3, page = 0, busqueda } = req.query;

        // si es mongo_id se retorna el resultado
        if (mongoose.Types.ObjectId.isValid(<string>busqueda)) {
            const hospital = await Hospital.findOne({ _id: busqueda });
            return res.status(200).json({
                ok: true,
                msg: 'GET only hospital by id',
                results: (hospital) ? [hospital] : []
            });
        }

        // de otro modo se realiza la búsqueda por los demás campos

        const desde: number = Number(limit) * Number(page);
        const regex = new RegExp(<string>busqueda, 'i');
        const hospitales = await Hospital.find({ nombre: regex })
            .populate('createdByUser', 'nombre email')
            .skip(desde)
            .limit(Number(limit));

        res.status(200).json({
            ok: true,
            msg: `GET búsqueda general`,
            params: req.query,
            results: hospitales
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperdado ${error}`
        });
    }
}

// solo médicos
export const buscarMedicos = async (req: Request, res: Response) => {
    try {
        const { limit = 3, page = 0, busqueda } = req.query;

        // si es mongo_id se retorna el resultado
        if (mongoose.Types.ObjectId.isValid(<string>busqueda)) {
            const medico = await Medico.findOne({ _id: busqueda });
            return res.status(200).json({
                ok: true,
                msg: 'GET only medico by id',
                results: (medico) ? [medico] : []
            });
        }

        // de otro modo se realiza la búsqueda por los demás campos

        const desde: number = Number(limit) * Number(page);
        const regex = new RegExp(<string>busqueda, 'i');
        const medicos = await Medico.find({ nombre: regex })
            .populate('createdByUser', 'nombre email')
            .populate('hospital', 'nombre')
            .skip(desde)
            .limit(Number(limit));

        res.status(200).json({
            ok: true,
            msg: `GET búsqueda general`,
            params: req.query,
            results: medicos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperdado ${error}`
        });
    }
}