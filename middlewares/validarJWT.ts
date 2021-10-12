import { NextFunction, Request, Response } from "express";
import jwt , { JwtPayload }from "jsonwebtoken";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
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
        
        next();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{msg: `Token no válido`}]
            
        });
    }

    
}