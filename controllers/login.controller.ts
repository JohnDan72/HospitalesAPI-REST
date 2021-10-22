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
                errors: [{msg: 'Correo o contraseña inválido 1'}]
                
            });
        }

        // checar la contraseña
        const validPassword = bcrypt.compareSync( password , usuario.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                errors: [{msg: 'Correo o contraseña inválido 2'}]
                
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
            errors: [{msg: `Error inesperado ${error}`}]
            
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
            errors: [{msg: `Token inválido: ${error}`}]
            
        });
    }

}


export const renewToken = async ( req: Request , res: Response ) => {
    try {
        const uid = req.uid;

        const [ renewedToken , usuario ] = await Promise.all([
            generarJWT(uid),
            Usuario.findById( uid , 'nombre email role img google')
        ])

        res.status(200).json({
            ok: true,
            msg: `GET | Renew Token`,
            uid,
            usuario,
            renewedToken,
            sideBarMenu: req.menuFront,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
            
        });
    }
}

export const getMenuFrontEnd = (req: Request , res: Response) => {
    try {
        const menu = [
            {
                titulo: 'Dashboard!!',
                icono: 'mdi mdi-gauge',
                submenu: [
                  { titulo: 'Main' , url: '/'},
                  { titulo: 'Progress' , url: '/dashboard/progress'},
                  { titulo: 'Gráfica' , url: '/dashboard/grafica1'},
                  { titulo: 'Promesas' , url: '/dashboard/promesas'},
                  { titulo: 'RXJS' , url: '/dashboard/rxjs'}
                ]
              }
              
        ];
        // se obtiene el role del usuario antes verificado con verificarJWT
        const { role } = req.userSolicitante;
        if(role == 'ADMIN_ROLE'){
            menu.push(
                {
                    titulo: 'Mantenimiento',
                    icono: 'mdi mdi-folder-lock-open',
                    submenu: [
                      { titulo: 'Usuarios' , url: '/dashboard/usuarios'},
                      { titulo: 'Hospitales' , url: '/dashboard/hospitales'},
                      { titulo: 'Medicos' , url: '/dashboard/medicos'}
                    ]
                }
            );
        }
        
        res.status(200).json({
            sidebarMenu: menu
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Error inesperado: ${error}`}]
        });
    }
}