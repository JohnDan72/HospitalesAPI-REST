import { Request, Response } from "express"
import Usuario from "../models/usuario";

export const getUsuarios = async( req: Request , res: Response ) => {
    const usuarios = await Usuario.find();

    res.status(200).json({
        msg: 'GET | Usuarios',
        usuarios
    })
}

export const crearUsuario = async ( req: Request , res: Response ) => {
    const { nombre, password , email} = req.body;

    const usuario = new Usuario( req.body );

    await usuario.save();

    res.status(200).json({
        ok: true,
        msg: 'POST | Usuarios',
        usuario
    })
}