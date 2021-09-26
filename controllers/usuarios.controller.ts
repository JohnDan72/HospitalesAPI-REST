import { Request, Response } from "express"


export const getUsuarios = ( req: Request , res: Response ) => {
    res.status(200).json({
        msg: 'GET | Usuarios'
    })
}