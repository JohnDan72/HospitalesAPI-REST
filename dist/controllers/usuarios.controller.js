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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.crearUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
// get all users
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.find();
    res.status(200).json({
        msg: 'GET | Usuarios',
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
// create a user
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    try {
        const usuario = new usuario_1.default(req.body);
        // encrypting password
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        res.status(200).json({
            ok: true,
            msg: 'POST | Usuarios',
            usuario
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        });
    }
});
exports.crearUsuario = crearUsuario;
// update the user's info
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    try {
        // campos que no se pueden actualizar y se extraen los demás campos
        const _a = req.body, { google, status, role, img, password, email } = _a, campos = __rest(_a, ["google", "status", "role", "img", "password", "email"]);
        const foundUser = req.userAux; //recuperado del midleware de checar usuario si existe
        if (foundUser.email != email) {
            const existeEmail = yield usuario_1.default.findOne({ email: campos.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya ha sido registrado'
                });
            }
            campos.email = email;
        }
        const usuarioActualizado = yield usuario_1.default.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'PUT | Usuarios',
            usuarioActualizado
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        });
    }
});
exports.updateUsuario = updateUsuario;
// delete a specific user changing his status to false 
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        ok: true,
        msg: 'DELETE | Usuario',
        body: req.params
    });
    const uid = req.params.id;
    try {
        // campos que no se pueden actualizar y se extraen los demás campos
        const _b = req.body, { google, status, role, img, password, email } = _b, campos = __rest(_b, ["google", "status", "role", "img", "password", "email"]);
        const foundUser = req.userAux; //recuperado del midleware de checar usuario si existe
        if (foundUser.email != email) {
            const existeEmail = yield usuario_1.default.findOne({ email: campos.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este correo ya ha sido registrado'
                });
            }
            campos.email = email;
        }
        const usuarioActualizado = yield usuario_1.default.findByIdAndUpdate(uid, campos, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'PUT | Usuarios',
            usuarioActualizado
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado: ' + error
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map