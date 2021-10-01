import express, { Application } from "express";
import userRoutes from "../routes/usuarios.routes";
import loginRoutes from "../routes/login.routes";
import hospitalRoutes from "../routes/hospitales.routes";
import medicoRoutes from "../routes/medicos.routes";

import { dbConnection } from "../database/config";
import cors from "cors";

class Server {

    private app: Application;
    private port: string;
    private appPaths = {
        usuarios: '/api/usuarios',
        login: '/api/login',
        hospitales: '/api/hospitales',
        medicos: '/api/medicos'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares();
        this.dbConnection();
        this.routes();
    }

    async dbConnection(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // lectura del body
        this.app.use( express.json() );
        
        // carpeta pública
        // this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.appPaths.usuarios , userRoutes );
        this.app.use( this.appPaths.login , loginRoutes );
        this.app.use( this.appPaths.hospitales , hospitalRoutes );
        this.app.use( this.appPaths.medicos , medicoRoutes );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

export default Server;