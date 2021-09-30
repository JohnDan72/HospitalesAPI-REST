import Usuario from "../models/usuario";


//verificar si el correo existe
export const checarEmailExiste= async(email = '') => {
    const existeMail = await Usuario.findOne({email});
    if(existeMail){
        throw new Error(`Este correo ${email} ya esta registrado`);
    }
}

//verificar si el correo existe para LOGIN
export const checarEmailExisteLogin= async(email = '') => {
    const existeMail = await Usuario.findOne({email, status: true});
    if(!existeMail){
        throw new Error(`La cuenta con este correo no existe`);
    }
}

