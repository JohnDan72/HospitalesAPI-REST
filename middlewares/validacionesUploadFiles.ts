import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import Hospital from "../models/hospital";
import Medico from "../models/medico";
import Usuario from "../models/usuario";

const tiposValidos = ['usuarios', 'hospitales', 'medicos'];
const extensionesValidas = ['jpg', 'jpeg', 'png', 'tiff', 'gif'];

// valida el tipo de upload para: users, hospitales o médicos
export const validaTipo = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tipo } = req.query;
        if (!tiposValidos.includes(String(tipo))) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: `Bad request, permited types: ${tiposValidos}` }]

            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{ msg: `Error inesperado 1: ${error}` }]
        })
    }
}

// valida si existe un file en la request y si tiene una extensión permitida
export const validaFile = (req: Request, res: Response, next: NextFunction) => {
    try {
        // check if file exists
        if (!req.files || Object.keys(req.files).length === 0 || typeof req.files.imagen === 'undefined') {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: 'Not files to upload' }]
            });
        }

        // check extension file
        const file: any = req.files.imagen;
        const nombreDividido = file.name.split('.');
        const extension = nombreDividido[nombreDividido.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: `Archivos permitidos: ${extensionesValidas}` }]
            });
        }
        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{ msg: `Error inesperado 2: ${error}` }]
        })
    }
}

// valida existe registro dado el tipo y uid
export const validaExisteRegistro = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tipo , uid } = req.query;
        let modelo;

        switch (tipo) {
            case 'usuarios': modelo = await Usuario.findById(uid,'img'); break;
            case 'hospitales': modelo = await Hospital.findById(uid,'img'); break;
            case 'medicos': modelo = await Medico.findById(uid,'img'); break;
            default:
                return res.status(500).json({
                    ok: false,
                    errors: [{ msg: `Tipos válidos: ${tiposValidos}` }]
                });
        }
        // checar si existe el registro del tipo correspondiente
        if (!modelo) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: `Objeto de tipo: ${tipo} no existe` }]
            })
        }
        // se guarda el modelo en la request para procesarlo en el
        req.modeloAux = modelo;
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{ msg: `Error inesperado 3: ${error}` }]
        })
    }
}