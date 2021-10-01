import express, { Application } from "express";
import userRoutes from "../routes/usuarios.routes";
import loginRoutes from "../routes/login.routes";

import { dbConnection } from "../database/config";
import cors from "cors";

class Server {

    private app: Application;
    private port: string;
    private appPaths = {
        usuarios: '/api/usuarios',
        login: '/api/login'
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
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

export default Server;