import { Request, Response } from "express"
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario";

// get all users
export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.find();

    res.status(200).json({
        msg: 'GET | Usuarios',
        usuarios
    })
}

// create a user
export const crearUsuario = async (req: Request, res: Response) => {
    
    const { password } = req.body;

    try {

        const usuario = new Usuario(req.body);
        // encrypting password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt );

        await usuario.save();

        res.status(200).json({
            ok: true,
            msg: 'POST | Usuarios',
            usuario
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        })
    }

}

// update the user's info
export const updateUsuario = async (req: Request , res: Response) => {
    const uid = req.params.id;
    try {
        // campos que no se pueden actualizar y se extraen los demás campos
        const { google , status , role , img , password , email , ...campos} = req.body;

        const foundUser = req.userAux; //recuperado del midleware de checar usuario si existe
        if(foundUser.email != email){
            const existeEmail = await Usuario.findOne({ email: campos.email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya ha sido registrado'
                });
            }
            campos.email = email;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid , campos , { new: true } );
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
export const deleteUsuario = async (req: Request , res: Response) => {
    return res.status(200).json({
        ok: true,
        msg: 'DELETE | Usuario',
        body: req.params
    });

    const uid = req.params.id;
    try {
        // campos que no se pueden actualizar y se extraen los demás campos
        const { google , status , role , img , password , email , ...campos} = req.body;

        const foundUser = req.userAux; //recuperado del midleware de checar usuario si existe
        if(foundUser.email != email){
            const existeEmail = await Usuario.findOne({ email: campos.email });
            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya ha sido registrado'
                });
            }
            campos.email = email;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid , campos , { new: true } );
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