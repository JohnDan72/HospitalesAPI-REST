import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';
import { updateImagen } from "../helpers/updateImage";

export const uploadFile = (req: Request, res: Response) => {
    try {
        const tiposValidos = ['usuarios', 'hospitales', 'medicos'];
        const { tipo, uid } = req.query;
        if (!tiposValidos.includes(String(tipo))) {
            return res.status(400).json({
                ok: false,
                msg: `Bad request, permited types: ${tiposValidos}`
            })
        }

        if (!req.files || Object.keys(req.files).length === 0 || typeof req.files.imagen === 'undefined') {
            return res.status(400).json({
                ok: false,
                msg: 'Not files to upload'
            });
        }

        // check extension file
        const extensionesValidas = ['jpg', 'jpeg', 'png', 'tiff', 'gif'];
        const file: UploadedFile = <UploadedFile>req.files.imagen;
        const nombreDividido = file.name.split('.');
        const extension = nombreDividido[nombreDividido.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return res.status(400).json({
                ok: false,
                msg: `Accepted extentions: ${extensionesValidas}`
            });
        }

        // nombre único de la imagen
        const fileName = `${uuidv4()}.${extension}`;
        const uploadPath = `./uploads/${tipo}/${fileName}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, async (err) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    msg: `Error inesperado ${err}`
                });
            }
            
            const success = await updateImagen( <string>tipo , <string>uid , fileName);
            if(!success){
                return res.status(500).json({
                    ok: false,
                    msg: `parece que ocurrió un error en update image`
                });
            }
            res.status(200).json({
                ok: true,
                msg: 'PUT | Upload file successed',
                fileName
            });
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error inesperado ${error}`
        })
    }
}