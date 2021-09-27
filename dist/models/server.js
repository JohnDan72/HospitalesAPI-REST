"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const config_1 = require("../database/config");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.appPaths = {
            usuarios: '/api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        this.middlewares();
        this.dbConnection();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // lectura del body
        this.app.use(express_1.default.json());
        // carpeta pública
        // this.app.use( express.static('public') );
    }
    routes() {
        this.app.use(this.appPaths.usuarios, usuarios_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map