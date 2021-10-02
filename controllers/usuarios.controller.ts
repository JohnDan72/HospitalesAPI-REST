import { Request, Response } from "express"
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario";
import { generarJWT } from "../helpers/jwt";

// get all users
export const getUsuarios = async (req: Request, res: Response) => {
    const { limit = 3, page = 0 } = req.query;
    try {
        const desde: number = Number(limit) * Number(page);
        const [usuarios, total] = await Promise.all([
            Usuario.find({ status: true })
                .skip(desde)
                .limit(Number(limit)),
            Usuario.countDocuments()

        ]);

        res.status(200).json({
            msg: 'GET | Usuarios',
            total, 
            usuarios
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado ${error}`
        });
    }

}

// create a user
export const crearUsuario = async (req: Request, res: Response) => {

    const { password } = req.body;

    try {

        const usuario = new Usuario(req.body);
        // encrypting password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // crear nuevo token
        const token = await generarJWT(usuario._id);

        res.status(200).json({
            ok: true,
            msg: 'POST | Usuarios',
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        })
    }

}

// update the user's info
export const updateUsuario = async (req: Request, res: Response) => {
    const uid = req.params.id;
    try {
        // campos que no se pueden actualizar y se extraen los demás campos
        const { google, status, role, img, password, email, ...campos } = req.body;

        const foundUser = req.userAux; //recuperado del midleware de checar usuario si existe
        if (foundUser.email != email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya ha sido registrado'
                });
            }
            campos.email = email;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'PUT | Usuarios',
            usuarioActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        })
    }

}

// delete a specific user changing his status to false 
export const deleteUsuario = async (req: Request, res: Response) => {

    const uid = req.params.id;
    try {
        const usuarioBorrado = await Usuario.findByIdAndUpdate(uid, { status: false }, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'DELETE | Usuario by id',
            usuarioBorrado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        })
    }

}