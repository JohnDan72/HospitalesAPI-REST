import Usuario from "../models/usuario";
import Hospital from "../models/hospital";
import Medico from "../models/medico";
import fs from "fs";

export const updateImagen = async (tipo: string, uid: string, fileName: string) => {
    let schema: any;
    let pathViejo: string ;

    switch (tipo) {
        case 'usuarios':
            schema = await Usuario.findById(uid);
            break;

        case 'hospitales':
            schema = await Hospital.findById(uid);
            break;

        case 'medicos':
            schema = await Medico.findById(uid);
            break;

        default:
            return false;

    }

    if (!schema) {
        console.log("No es una entidad válida por id");
        return false;
    }

    pathViejo = `./uploads/${tipo}/${schema.img}`;

    borrarImg(pathViejo);

    schema.img = fileName;
    await schema.save();
    return true;
}

const borrarImg = (path: string) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}