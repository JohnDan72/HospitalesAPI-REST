import { NextFunction, Request, Response } from "express";
import jwt , { JwtPayload }from "jsonwebtoken";
import usuario from "../models/usuario";

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    // leer el token
    const tokenAcceso = req.header('Authorization');
    // console.log(tokenAcceso);
    //  verificar el token
    if(!tokenAcceso){
        return res.status(400).json({
            ok: false,
            errors: [{msg: `Token missed`}]
            
        })
    }

    try {
        const payload = <JwtPayload> jwt.verify( tokenAcceso , process.env.JWT_SECRETE_KEY+'');

        req.uid = payload.uid;

        req.userSolicitante = await usuario.findById(payload.uid,'nombre role email google');
        
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Token no válido`}]
            
        });
    }

    
}