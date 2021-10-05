import { Request, Response } from "express";
import Usuario from "../models/usuario";

import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt";
import { verifyGoogleToken } from "../helpers/google-verify";

// login normal
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
        const token = await generarJWT(usuario._id);
        return res.status(200).json({
            ok: true,
            msg: 'POST | Login',
            email, 
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado ${error}`
        });
    }

}

// login con google
export const loginGoogle = async(req: Request, res: Response) => {

    try {
        const { token } = req.body;
        const { name , email , picture } = await verifyGoogleToken( token );

        const usuarioDB = await Usuario.findOne({ email });
        let newUser: any;
        if( !usuarioDB ){ //usuario no existe
            newUser = new Usuario({
                nombre: name,
                email,
                password: '--',
                img: picture,
                google: true
            })
        }
        else{
            newUser = usuarioDB;
            newUser.google = true;
            // newUser.password = true;
             
        }
        await newUser.save();
    
        // generar un JWT
        const jwt_token = await generarJWT(newUser._id);
        return res.status(200).json({
            ok: true,
            msg: 'POST | Login Google Sign In',
            jwt_token
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: `Token inválido: ${error}`
        });
    }

}