import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";
import cloudinaryLib, { ConfigOptions } from "cloudinary";
// env para usar fuera de las funciones
import dotenv from "dotenv";
dotenv.config();

import { updateImagen } from "../helpers/updateImage";

// Cloudinary
const cloudinary = cloudinaryLib.v2;

cloudinary.config(<ConfigOptions>{
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const tiposValidos = ['usuarios', 'hospitales', 'medicos'];

export const uploadFile = (req: Request, res: Response) => {
    try {

        const { tipo, uid } = req.query;
        if (!tiposValidos.includes(String(tipo))) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: `Bad request, permited types: ${tiposValidos}` }]

            })
        }

        if (!req.files || Object.keys(req.files).length === 0 || typeof req.files.imagen === 'undefined') {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: 'Not files to upload' }]

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
                errors: [{ msg: `Accepted extentions: ${extensionesValidas}` }]

            });
        }

        // nombre único de la imagen
        const fileName = `${uuidv4()}.${extension}`;
        const uploadPath = `./uploads/${tipo}/${fileName}`;

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    errors: [{ msg: `Error inesperado ${err}` }]

                });
            }

            const success = await updateImagen(<string>tipo, <string>uid, fileName);
            if (!success) {
                return res.status(500).json({
                    ok: false,
                    errors: [{ msg: `parece que ocurrió un error en update image` }]

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
            errors: [{ msg: `Error inesperado ${error}` }]

        })
    }
}

export const getImage = (req: Request, res: Response) => {
    const { tipo, imagenName } = req.query;

    try {

        if (!tiposValidos.includes(String(tipo))) {
            return res.status(400).json({
                ok: false,
                errors: [{ msg: `Bad request, permited types: ${tiposValidos}` }]

            })
        }
        const pathImg = path.join(__dirname, `../../uploads/${tipo}/${imagenName}`)

        if (!fs.existsSync(pathImg)) {
            const noImagePath = path.join(__dirname, `../../uploads/no-img.jpg`);
            return res.sendFile(noImagePath);
        }

        res.sendFile(pathImg);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{ msg: `Error inesperado: ${error}` }]

        })
    }
}

/**-------------------------Mismas funciones pero con Cloudinary -------------------------*/
export const updateImgUserCloudinary = async (req: Request, res: Response) => {
    
    try {
        // modelo encontrado después de todos los middlewares
        const modelo = req.modeloAux;
        
        // limpiar imgs previas
        if (modelo.img) {
            // borrar img del servidor de Cloudinary
            const nombreArr = modelo.img.split("/");
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');

            cloudinary.uploader.destroy(public_id);
        }
        
        const files = <FileArray>req.files;
        const { tempFilePath } = <UploadedFile>files.imagen;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();

        res.status(200).json({
            ok: true,
            msg: `Upload success!! ${req.query.tipo}`,
            modelo
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            errors: [{ msg: `Error inesperado jeje: ${error}` }],
            error
        })
    }
    
}