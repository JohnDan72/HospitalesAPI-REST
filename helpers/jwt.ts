import jwt from "jsonwebtoken";

export const generarJWT = (uid: string) => {

    return new Promise( ( resolve , reject ) => {
        const payload = {
            uid,
        }

        jwt.sign(payload, process.env.JWT_SECRETE_KEY + '', {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`No se pudo generar el JWT ${err}`)
            }
            else{
                resolve( token );
            }
        });
    })




}