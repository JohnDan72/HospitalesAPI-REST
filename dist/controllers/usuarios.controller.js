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
exports.crearUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.find();
    res.status(200).json({
        msg: 'GET | Usuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, password, email } = req.body;
    const usuario = new usuario_1.default(req.body);
    yield usuario.save();
    res.status(200).json({
        ok: true,
        msg: 'POST | Usuarios',
        usuario
    });
});
exports.crearUsuario = crearUsuario;
//# sourceMappingURL=usuarios.controller.js.map