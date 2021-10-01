import { Request, Response } from "express";
import Usuario from "../models/usuario";

import bcrypt from "bcryptjs";

export const login = async(req: Request, res: Response) => {

    const { email , password } = req.body;
    try {

        const usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña inválido 1'
            });
        }

        // checar la contraseña
        const validPassword = bcrypt.compareSync( password , usuario.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña inválido 2'
            });
        }

        // generar un JWT
        
        return res.status(200).json({
            ok: true,
            msg: 'POST | Login',
            email, 
            password
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado ${error}`
        });
    }

}